import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Emilus';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light'
};

export const AppRoute = {
	position: `${APP_PREFIX_PATH}/positions`,
	apple: `${APP_PREFIX_PATH}/positions/apple`,
	clients: `${APP_PREFIX_PATH}/positions/clients`,
	setting: `${APP_PREFIX_PATH}/positions/setting`,
	summer: `${APP_PREFIX_PATH}/positions/summer`,
	tree: `${APP_PREFIX_PATH}/positions/tree`,
	house: `${APP_PREFIX_PATH}/house`,
	flat: `${APP_PREFIX_PATH}/house/flat`,
	accommodation: `${APP_PREFIX_PATH}/house/accommodation`,
	oneBedroom: `${APP_PREFIX_PATH}/house/accommodation/one-bedroom`,
	twoBedroom: `${APP_PREFIX_PATH}/house/accommodation/two-bedroom`,
	studio: `${APP_PREFIX_PATH}/house/accommodation/studio`,
	townhouse: `${APP_PREFIX_PATH}/house/townhouse`,
}