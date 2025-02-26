export interface IEpisodes {
    id:                 string;
    title:              string;
    description:        string;
    image:              string;
    episode:            string;
    season_title:       SeasonTitle;
    season_id:          SeasonID;
    next_episode_id:    string;
    next_episode_title: string;
    url:                string;
}

export enum SeasonID {
    Gyvnm8476 = "GYVNM8476",
}

export enum SeasonTitle {
    OnePieceEastBlue161 = "One Piece: East Blue (1-61)",
}
