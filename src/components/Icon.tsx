'use client'

import React from 'react'
import WhatsApp from '@mui/icons-material/WhatsApp'
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded'
import SendRounded from '@mui/icons-material/SendRounded'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded'
import FileDownloadRounded from '@mui/icons-material/FileDownloadRounded'
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded'
import ArrowOutwardRounded from '@mui/icons-material/ArrowOutwardRounded'
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded'
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded'
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded'
import RotateRightRounded from '@mui/icons-material/RotateRightRounded'
import RestartAltRounded from '@mui/icons-material/RestartAltRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import LightModeRounded from '@mui/icons-material/LightModeRounded'
import DarkModeRounded from '@mui/icons-material/DarkModeRounded'
import MenuRounded from '@mui/icons-material/MenuRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'

const icons = {
  whatsapp: WhatsApp,
  mail: MailOutlineRounded,
  send: SendRounded,
  external: OpenInNewRounded,
  download: FileDownloadRounded,
  arrow: ArrowForwardRounded,
  arrowOutward: ArrowOutwardRounded,
  arrowDown: ArrowDownwardRounded,
  arrowUp: ArrowUpwardRounded,
  arrowBack: ArrowBackRounded,
  rotate: RotateRightRounded,
  restart: RestartAltRounded,
  star: StarRounded,
  github: GitHub,
  linkedin: LinkedIn,
  sun: LightModeRounded,
  moon: DarkModeRounded,
  menu: MenuRounded,
  close: CloseRounded,
}

export type IconName = keyof typeof icons

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  const MaterialIcon = icons[name]
  return <MaterialIcon aria-hidden="true" focusable="false" fontSize="inherit" className={className} style={{ width: size, height: size, verticalAlign: 'middle', flexShrink: 0 }} />
}
