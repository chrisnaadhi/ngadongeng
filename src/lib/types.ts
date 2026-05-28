// ─── Content Taxonomy ────────────────────────────────────────────────────────

export type DongengFormat = 'teks' | 'komik' | 'audio' | 'audiovisual';

export type DongengCategory =
	| 'binatang'
	| 'dewa-dewi'
	| 'manusia'
	| 'asal-usul'
	| 'sejarah'
	| 'jenaka'
	| 'legenda';

export type DongengGenre =
	| 'fabel'
	| 'legenda'
	| 'mite'
	| 'sage'
	| 'dongeng-anak'
	| 'pantun'
	| 'guguritan'
	| 'parabel'
	| 'lainnya';

export type DongengLanguage =
	| 'sunda'
	| 'sunda-buhun'
	| 'indonesia'
	| 'sunda-indonesia'
	| 'dwibahasa';

export type DongengRegion =
	| 'priangan'
	| 'banten'
	| 'cirebon'
	| 'pesisir-utara'
	| 'sunda-umum'
	| 'melayu-sunda';

export type ContributorRole = 'tbm' | 'komunitas' | 'kurator' | 'individu';

export type DongengStatus = 'draft' | 'pending_review' | 'published' | 'rejected' | 'archived';

export type UserRole = 'reader' | 'contributor' | 'admin' | 'superadmin';

// ─── Data Models ─────────────────────────────────────────────────────────────

export interface Contributor {
	username: string;
	displayName: string;
	avatarUrl?: string;
	role: ContributorRole;
	bio?: string;
	storyCount: number;
	joinedAt: string; // ISO date string
}

export interface DongengStory {
	id: string;
	slug: string;
	title: string;
	excerpt?: string;
	coverUrl?: string;
	format: DongengFormat;
	category: DongengCategory;
	genre: DongengGenre;
	language: DongengLanguage;
	region: DongengRegion;
	duration?: string; // e.g. '12 menit', '8 halaman'
	author: Pick<Contributor, 'username' | 'displayName' | 'avatarUrl' | 'role'>;
	publishedAt: string; // ISO date string
	featured?: boolean;
	viewCount?: number;
	synopsis?: string;
	moralMessage?: string;
	// Rich content (for detail page)
	bodyText?: string; // for teks format
	audioSrc?: string; // for audio format
	transcript?: string; // for audio/av
	videoSrc?: string; // for audiovisual
	videoPoster?: string; // for audiovisual
	comicPages?: Array<{ url: string; alt?: string }>; // for komik
	tags?: string[];
	sourceRef?: string; // original source attribution
	// Embed fields — used for komik and iframe-based media
	embedUrl?: string;
	embedProvider?: string;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type BadgeType = 'tbm' | 'komunitas' | 'kurator' | 'individu' | 'baru' | 'unggulan';

export type ButtonVariant = 'primary' | 'secondary' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface FilterState {
	format: DongengFormat | 'semua';
	category: DongengCategory | 'semua';
	language: DongengLanguage | 'semua';
	sort: 'terbaru' | 'terpopuler' | 'az';
	query: string;
}
