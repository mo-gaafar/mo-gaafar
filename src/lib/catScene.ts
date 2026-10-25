import * as THREE from 'three'

export type CatControls = {
  pause: (value: boolean) => void
  pet: () => void
  turn: () => void
  dispose: () => void
}

export function makeCat() {
  const cat = new THREE.Group()
  const orange = new THREE.MeshStandardMaterial({ color: '#db782c', roughness: 0.82 })
  const cream = new THREE.MeshStandardMaterial({ color: '#ffe7c4', roughness: 0.9 })
  const stripe = new THREE.MeshStandardMaterial({ color: '#914319', roughness: 0.9 })
  const pink = new THREE.MeshStandardMaterial({ color: '#e5a293', roughness: 0.8 })
  const green = new THREE.MeshStandardMaterial({ color: '#afcf74', roughness: 0.5 })
  const black = new THREE.MeshStandardMaterial({ color: '#172220', roughness: 0.5 })
  const sphere = new THREE.SphereGeometry(1, 24, 16)
  function blob(
    parent: THREE.Group,
    material: THREE.Material,
    position: number[],
    scale: number[],
  ) {
    const mesh = new THREE.Mesh(sphere, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.scale.set(scale[0], scale[1], scale[2])
    parent.add(mesh)
    return mesh
  }
  blob(cat, orange, [0, 0.85, -0.15], [0.56, 0.57, 0.82])
  blob(cat, cream, [0, 0.82, 0.5], [0.4, 0.48, 0.15])
  const legs: THREE.Mesh[] = []
  for (const x of [-0.36, 0.36])
    for (const z of [-0.63, 0.43]) {
      const leg = blob(cat, orange, [x, 0.35, z], [0.2, 0.35, 0.23])
      blob(cat, cream, [x, 0.14, z + 0.06], [0.21, 0.14, 0.27])
      legs.push(leg)
    }
  const head = new THREE.Group()
  head.position.set(0, 1.4, 0.58)
  cat.add(head)
  blob(head, orange, [0, 0, 0], [0.66, 0.59, 0.54])
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.27, 0.62, 3), orange)
    ear.position.set(side * 0.43, 0.51, -0.02)
    ear.rotation.set(0, Math.PI, side * -0.18)
    head.add(ear)
    const inner = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.39, 3), pink)
    inner.position.set(side * 0.43, 0.52, 0.13)
    inner.rotation.copy(ear.rotation)
    head.add(inner)
    blob(head, cream, [side * 0.19, -0.2, 0.45], [0.26, 0.2, 0.13])
    blob(head, green, [side * 0.26, 0.06, 0.46], [0.19, 0.22, 0.08])
    blob(head, black, [side * 0.26, 0.06, 0.53], [0.055, 0.16, 0.025])
    blob(head, cream, [side * 0.26 - 0.03, 0.12, 0.55], [0.035, 0.04, 0.015])
    for (let i = 0; i < 3; i++) {
      const cheek = blob(
        head,
        stripe,
        [side * (0.53 - i * 0.025), -0.04 - i * 0.11, 0.32],
        [0.12, 0.025, 0.045],
      )
      cheek.rotation.z = side * 0.3
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.4, 5), cream)
      whisker.position.set(side * 0.48, -0.18 - i * 0.07, 0.55)
      whisker.rotation.z = side * (1.2 + i * 0.25)
      head.add(whisker)
    }
  }
  blob(head, pink, [0, -0.14, 0.59], [0.09, 0.065, 0.045])
  for (const x of [-0.18, 0, 0.18]) {
    const mark = blob(head, stripe, [x, 0.36, 0.39], [0.045, 0.14, 0.025])
    mark.rotation.z = -x
  }
  for (const z of [-0.55, -0.2, 0.15])
    for (const x of [-0.49, 0.49]) {
      const mark = blob(cat, stripe, [x, 0.95, z], [0.07, 0.32, 0.09])
      mark.rotation.z = Math.sign(x) * 0.2
    }
  const tail = new THREE.Group()
  tail.position.set(0, 0.95, -0.8)
  cat.add(tail)
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.15, 0.3, -0.3),
    new THREE.Vector3(0.3, 0.85, -0.35),
    new THREE.Vector3(0.15, 1.05, -0.25),
  ])
  tail.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.12, 8, false), orange))
  blob(tail, stripe, [0.15, 1.05, -0.25], [0.12, 0.13, 0.12])
  return { cat, legs, head, tail }
}

export function createCatScene(canvas: HTMLCanvasElement, onLost: () => void): CatControls {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30)
  camera.position.set(3.1, 2.6, 5.5)
  camera.lookAt(0, 1, 0)
  scene.add(new THREE.HemisphereLight(0xffefd7, 0x64757c, 3))
  const light = new THREE.DirectionalLight(0xffffff, 3)
  light.position.set(-3, 5, 4)
  scene.add(light)
  const { cat, legs, head, tail } = makeCat()
  scene.add(cat)
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(2, 48),
    new THREE.MeshStandardMaterial({ color: '#c9d4ca', roughness: 1 }),
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)
  let paused = true
  let visible = false
  let lost = false
  let rotation = 0
  let time = 0
  let previous = 0
  let petUntil = 0
  const render = () => {
    if (!lost) renderer.render(scene, camera)
  }
  const sync = () => {
    previous = 0
    renderer.setAnimationLoop(!paused && visible && !document.hidden && !lost ? animate : null)
    render()
  }
  function animate(now: number) {
    if (previous && now - previous < 1000 / 30) return
    time += previous ? Math.min((now - previous) / 1000, 0.1) : 0
    previous = now
    const petting = now < petUntil
    cat.position.x = Math.sin(time * 0.55) * 0.55
    cat.position.y = petting ? Math.abs(Math.sin(time * 7)) * 0.13 : Math.sin(time * 6) * 0.025
    cat.rotation.y = rotation + Math.sin(time * 0.55) * 0.45
    legs.forEach((leg, i) => {
      leg.rotation.x = Math.sin(time * 6 + (i === 0 || i === 3 ? 0 : Math.PI)) * 0.28
    })
    tail.rotation.z = Math.sin(time * 2) * 0.2
    head.rotation.z = petting ? Math.sin(time * 5) * 0.18 : Math.sin(time) * 0.04
    render()
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = canvas.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    render()
  })
  resize.observe(canvas)
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    sync()
  })
  observer.observe(canvas)
  const contextLost = (event: Event) => {
    event.preventDefault()
    lost = true
    renderer.setAnimationLoop(null)
    onLost()
  }
  canvas.addEventListener('webglcontextlost', contextLost)
  document.addEventListener('visibilitychange', sync)
  return {
    pause(value) {
      paused = value
      sync()
    },
    pet() {
      petUntil = performance.now() + 1600
      head.rotation.z = paused ? (head.rotation.z > 0 ? -0.18 : 0.18) : 0
      render()
    },
    turn() {
      rotation += Math.PI / 4
      cat.rotation.y = rotation
      render()
    },
    dispose() {
      renderer.setAnimationLoop(null)
      resize.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      canvas.removeEventListener('webglcontextlost', contextLost)
      const geometries = new Set<THREE.BufferGeometry>()
      const materials = new Set<THREE.Material>()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry)
          for (const material of Array.isArray(object.material)
            ? object.material
            : [object.material])
            materials.add(material)
        }
      })
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
