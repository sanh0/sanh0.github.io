import type { SocialObjects } from './types';

export const SITE = {
	website: 'https://sanh0.github.io/',
	author: 'Sanho',
	desc: '이것저것 개발 블로그',
	title: 'Sanh0 Blog',
	ogImage: 'astropaper-og.jpg',
	lightAndDarkMode: false,
	postPerPage: 3,
};

export const LOGO_IMAGE = {
	enable: false,
	svg: true,
	width: 216,
	height: 46,
};

export const SOCIALS: SocialObjects = [
	{
		name: 'Github',
		href: 'https://github.com/sanh0',
		linkTitle: ` ${SITE.title} on Github`,
		active: true,
	},
	{
		name: 'Mail',
		href: 'mailto:kangsanho718@gmail.com',
		linkTitle: `Send an email to ${SITE.title}`,
		active: false,
	},
];
