import { CalendarDays, Monitor, Music, Tag, Wrench, type LucideIcon } from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'music' -> t('nav.music')
	path: string // URL 路径，如 '/music'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'music', path: '/music', icon: Music, isContentType: true },
	{ key: 'mods', path: '/mods', icon: Wrench, isContentType: true },
	{ key: 'platforms', path: '/platforms', icon: Monitor, isContentType: true },
	{ key: 'price', path: '/price', icon: Tag, isContentType: true },
	{ key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['music', 'mods', 'platforms', 'price', 'release']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
