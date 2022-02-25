import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiPs from "../../apiPS";
import MatchCard from "../elements/MatchCard";
import LoadingPage from "../LoadingPage";
import { formatDate } from "../functions/formatsDateTime";

export default function LeagueSchedule() {
    const   { id } = useParams(),
            [loading, setLoading] = useState(false),
            [serie, setSerie] = useState({
                "begin_at": "2022-01-12T08:00:00Z",
                "description": null,
                "end_at": "2022-04-02T23:00:00Z",
                "full_name": "Spring 2022",
                "id": 4250,
                "league": {
                    "id": 293,
                    "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                    "modified_at": "2021-01-06T15:41:48Z",
                    "name": "LCK",
                    "slug": "league-of-legends-lck-champions-korea",
                    "url": null
                },
                "league_id": 293,
                "modified_at": "2022-01-28T15:58:38Z",
                "name": null,
                "season": "Spring",
                "slug": "league-of-legends-lck-champions-korea-spring-2022",
                "tier": "a",
                "tournaments": [
                    {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    }
                ],
                "videogame": {
                    "id": 1,
                    "name": "LoL",
                    "slug": "league-of-legends"
                },
                "videogame_title": null,
                "winner_id": null,
                "winner_type": null,
                "year": 2022
            }),
            [pastMatches, setPastMatches] = useState([
                {
                    "winner": {
                        "acronym": "LSB",
                        "id": 75013,
                        "image_url": "https://cdn.pandascore.co/images/team/image/75013/liiv_sandbo_xlogo_profile.png",
                        "location": "KR",
                        "modified_at": "2022-01-13T16:36:33Z",
                        "name": "Liiv SANDBOX",
                        "slug": "sandbox-gaming"
                    },
                    "live": {
                        "opens_at": "2022-02-24T11:17:12Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616072"
                    },
                    "draw": false,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "end_at": "2022-02-24T13:19:58Z",
                    "slug": "liiv-sandbox-vs-hanwha-life-esports-2022-02-24",
                    "scheduled_at": "2022-02-24T11:30:00Z",
                    "original_scheduled_at": "2022-02-24T11:00:00Z",
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "LSB",
                                "id": 75013,
                                "image_url": "https://cdn.pandascore.co/images/team/image/75013/liiv_sandbo_xlogo_profile.png",
                                "location": "KR",
                                "modified_at": "2022-01-13T16:36:33Z",
                                "name": "Liiv SANDBOX",
                                "slug": "sandbox-gaming"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "HLE",
                                "id": 2883,
                                "image_url": "https://cdn.pandascore.co/images/team/image/2883/hanwha-life-esports-1s04vbu0.png",
                                "location": "KR",
                                "modified_at": "2022-02-24T12:25:30Z",
                                "name": "Hanwha Life Esports",
                                "slug": "hanwha-life-esports"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "videogame_version": {
                        "current": false,
                        "name": "12.3.1"
                    },
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "id": 616072,
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "game_advantage": null,
                    "serie_id": 4250,
                    "status": "finished",
                    "winner_id": 75013,
                    "begin_at": "2022-02-24T11:32:12Z",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "league_id": 293,
                    "number_of_games": 3,
                    "tournament_id": 7313,
                    "match_type": "best_of",
                    "streams_list": [
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        }
                    ],
                    "forfeit": false,
                    "modified_at": "2022-02-24T13:33:08Z",
                    "name": "LSB vs HLE",
                    "rescheduled": true,
                    "games": [
                        {
                            "begin_at": "2022-02-24T11:32:12Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-24T12:17:45Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229194,
                            "length": 2288,
                            "match_id": 616072,
                            "position": 1,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 75013,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": "2022-02-24T12:33:22Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-24T13:19:58Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229195,
                            "length": 2198,
                            "match_id": 616072,
                            "position": 2,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 75013,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "results": [
                        {
                            "score": 2,
                            "team_id": 75013
                        },
                        {
                            "score": 0,
                            "team_id": 2883
                        }
                    ],
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    }
                },
                {
                    "winner": {
                        "acronym": "DRX",
                        "id": 126370,
                        "image_url": "https://cdn.pandascore.co/images/team/image/126370/220px_dr_xlogo_square.png",
                        "location": "KR",
                        "modified_at": "2022-02-09T12:32:27Z",
                        "name": "DRX",
                        "slug": "dragonx"
                    },
                    "live": {
                        "opens_at": "2022-02-24T07:46:39Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616071"
                    },
                    "draw": false,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "end_at": "2022-02-24T10:29:16Z",
                    "slug": "fredit-brion-vs-drx-2022-02-24",
                    "scheduled_at": "2022-02-24T08:00:00Z",
                    "original_scheduled_at": "2022-02-24T08:00:00Z",
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "BRO",
                                "id": 128218,
                                "image_url": "https://cdn.pandascore.co/images/team/image/128218/fredit_brio_nlogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-02-21T19:45:04Z",
                                "name": "Fredit BRION",
                                "slug": "fredit-brion"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "DRX",
                                "id": 126370,
                                "image_url": "https://cdn.pandascore.co/images/team/image/126370/220px_dr_xlogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-02-09T12:32:27Z",
                                "name": "DRX",
                                "slug": "dragonx"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "videogame_version": {
                        "current": false,
                        "name": "12.3.1"
                    },
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "id": 616071,
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "game_advantage": null,
                    "serie_id": 4250,
                    "status": "finished",
                    "winner_id": 126370,
                    "begin_at": "2022-02-24T08:01:39Z",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "league_id": 293,
                    "number_of_games": 3,
                    "tournament_id": 7313,
                    "match_type": "best_of",
                    "streams_list": [
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        }
                    ],
                    "forfeit": false,
                    "modified_at": "2022-02-24T10:43:33Z",
                    "name": "BRO vs DRX",
                    "rescheduled": false,
                    "games": [
                        {
                            "begin_at": "2022-02-24T08:01:40Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-24T08:38:20Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229191,
                            "length": 1855,
                            "match_id": 616071,
                            "position": 1,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 126370,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": "2022-02-24T08:55:25Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-24T09:35:27Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229192,
                            "length": 2031,
                            "match_id": 616071,
                            "position": 2,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 128218,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": "2022-02-24T09:51:57Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-24T10:29:17Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229193,
                            "length": 1727,
                            "match_id": 616071,
                            "position": 3,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 126370,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "results": [
                        {
                            "score": 1,
                            "team_id": 128218
                        },
                        {
                            "score": 2,
                            "team_id": 126370
                        }
                    ],
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    }
                },
                {
                    "winner": {
                        "acronym": "T1",
                        "id": 126061,
                        "image_url": "https://cdn.pandascore.co/images/team/image/126061/t_oscq04.png",
                        "location": "KR",
                        "modified_at": "2021-12-31T10:35:08Z",
                        "name": "T1",
                        "slug": "t1"
                    },
                    "live": {
                        "opens_at": "2022-02-23T10:48:53Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616070"
                    },
                    "draw": false,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "end_at": "2022-02-23T13:38:00Z",
                    "slug": "t1-vs-dwg-kia-2022-02-23",
                    "scheduled_at": "2022-02-23T11:00:00Z",
                    "original_scheduled_at": "2022-02-23T11:00:00Z",
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "T1",
                                "id": 126061,
                                "image_url": "https://cdn.pandascore.co/images/team/image/126061/t_oscq04.png",
                                "location": "KR",
                                "modified_at": "2021-12-31T10:35:08Z",
                                "name": "T1",
                                "slug": "t1"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "DK",
                                "id": 128409,
                                "image_url": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-01-04T00:32:15Z",
                                "name": "DWG KIA",
                                "slug": "dwg-kia"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "videogame_version": {
                        "current": false,
                        "name": "12.3.1"
                    },
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "id": 616070,
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "game_advantage": null,
                    "serie_id": 4250,
                    "status": "finished",
                    "winner_id": 126061,
                    "begin_at": "2022-02-23T11:03:53Z",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "league_id": 293,
                    "number_of_games": 3,
                    "tournament_id": 7313,
                    "match_type": "best_of",
                    "streams_list": [
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        }
                    ],
                    "forfeit": false,
                    "modified_at": "2022-02-23T13:47:39Z",
                    "name": "T1 vs DK",
                    "rescheduled": false,
                    "games": [
                        {
                            "begin_at": "2022-02-23T11:03:54Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-23T11:42:11Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229188,
                            "length": 1805,
                            "match_id": 616070,
                            "position": 1,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 126061,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": "2022-02-23T12:00:33Z",
                            "complete": true,
                            "detailed_stats": true,
                            "end_at": "2022-02-23T13:38:01Z",
                            "finished": true,
                            "forfeit": false,
                            "id": 229189,
                            "length": 2776,
                            "match_id": 616070,
                            "position": 2,
                            "status": "finished",
                            "video_url": null,
                            "winner": {
                                "id": 126061,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "results": [
                        {
                            "score": 2,
                            "team_id": 126061
                        },
                        {
                            "score": 0,
                            "team_id": 128409
                        }
                    ],
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    }
                }
            ]),
            [runningMatches, setRunningMatches] = useState([]),
            [upcomingMatches, setUpcomingMatches] = useState([
                {
                    "rescheduled": false,
                    "slug": "gen-g-vs-nongshim-red-force-2022-02-25",
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "end_at": null,
                    "forfeit": false,
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "league_id": 293,
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "winner": null,
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    },
                    "winner_id": null,
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "GEN",
                                "id": 2882,
                                "image_url": "https://cdn.pandascore.co/images/team/image/2882/geng-hooir6i9.png",
                                "location": "KR",
                                "modified_at": "2022-02-16T13:47:30Z",
                                "name": "Gen.G",
                                "slug": "geng"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "NS",
                                "id": 128217,
                                "image_url": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-02-22T16:20:31Z",
                                "name": "Nongshim Red Force",
                                "slug": "nongshim-red-force"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "id": 616073,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "videogame_version": null,
                    "game_advantage": null,
                    "draw": false,
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "live": {
                        "opens_at": "2022-02-25T07:45:00Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616073"
                    },
                    "results": [
                        {
                            "score": 0,
                            "team_id": 2882
                        },
                        {
                            "score": 0,
                            "team_id": 128217
                        }
                    ],
                    "serie_id": 4250,
                    "status": "not_started",
                    "begin_at": "2022-02-25T08:00:00Z",
                    "tournament_id": 7313,
                    "scheduled_at": "2022-02-25T08:00:00Z",
                    "number_of_games": 3,
                    "games": [
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229197,
                            "length": null,
                            "match_id": 616073,
                            "position": 1,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229198,
                            "length": null,
                            "match_id": 616073,
                            "position": 2,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229199,
                            "length": null,
                            "match_id": 616073,
                            "position": 3,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "original_scheduled_at": "2022-02-25T08:00:00Z",
                    "streams_list": [
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        }
                    ],
                    "name": "GEN vs NS",
                    "match_type": "best_of",
                    "modified_at": "2021-12-31T11:08:47Z"
                },
                {
                    "rescheduled": false,
                    "slug": "kwangdong-freecs-vs-dwg-kia-2022-02-25",
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "end_at": null,
                    "forfeit": false,
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "league_id": 293,
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "winner": null,
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    },
                    "winner_id": null,
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "KDF",
                                "id": 130063,
                                "image_url": "https://cdn.pandascore.co/images/team/image/130063/kwangdong_freecslogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-02-15T14:02:45Z",
                                "name": "Kwangdong Freecs",
                                "slug": "kwangdong-freecs"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "DK",
                                "id": 128409,
                                "image_url": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-01-04T00:32:15Z",
                                "name": "DWG KIA",
                                "slug": "dwg-kia"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "id": 616074,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "videogame_version": null,
                    "game_advantage": null,
                    "draw": false,
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "live": {
                        "opens_at": "2022-02-25T10:45:00Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616074"
                    },
                    "results": [
                        {
                            "score": 0,
                            "team_id": 130063
                        },
                        {
                            "score": 0,
                            "team_id": 128409
                        }
                    ],
                    "serie_id": 4250,
                    "status": "not_started",
                    "begin_at": "2022-02-25T11:00:00Z",
                    "tournament_id": 7313,
                    "scheduled_at": "2022-02-25T11:00:00Z",
                    "number_of_games": 3,
                    "games": [
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229200,
                            "length": null,
                            "match_id": 616074,
                            "position": 1,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229201,
                            "length": null,
                            "match_id": 616074,
                            "position": 2,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229202,
                            "length": null,
                            "match_id": 616074,
                            "position": 3,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "original_scheduled_at": "2022-02-25T11:00:00Z",
                    "streams_list": [
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        }
                    ],
                    "name": "KDF vs DK",
                    "match_type": "best_of",
                    "modified_at": "2021-12-31T11:09:03Z"
                },
                {
                    "rescheduled": false,
                    "slug": "kt-rolster-vs-fredit-brion-2022-02-26",
                    "official_stream_url": "https://www.twitch.tv/lck_korea",
                    "streams": {
                        "english": {
                            "embed_url": null,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        "official": {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        },
                        "russian": {
                            "embed_url": null,
                            "raw_url": null
                        }
                    },
                    "end_at": null,
                    "forfeit": false,
                    "serie": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "description": null,
                        "end_at": "2022-04-02T23:00:00Z",
                        "full_name": "Spring 2022",
                        "id": 4250,
                        "league_id": 293,
                        "modified_at": "2022-01-28T15:58:38Z",
                        "name": null,
                        "season": "Spring",
                        "slug": "league-of-legends-lck-champions-korea-spring-2022",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": null,
                        "year": 2022
                    },
                    "league_id": 293,
                    "league": {
                        "id": 293,
                        "image_url": "https://cdn.pandascore.co/images/league/image/293/LCK_2021_logo.png",
                        "modified_at": "2021-01-06T15:41:48Z",
                        "name": "LCK",
                        "slug": "league-of-legends-lck-champions-korea",
                        "url": null
                    },
                    "winner": null,
                    "tournament": {
                        "begin_at": "2022-01-12T08:00:00Z",
                        "end_at": "2022-03-20T14:00:00Z",
                        "id": 7313,
                        "league_id": 293,
                        "live_supported": true,
                        "modified_at": "2022-02-24T12:25:30Z",
                        "name": "Regular season",
                        "prizepool": null,
                        "serie_id": 4250,
                        "slug": "league-of-legends-lck-champions-korea-spring-2022-regular-season",
                        "tier": "a",
                        "winner_id": null,
                        "winner_type": "Team"
                    },
                    "winner_id": null,
                    "opponents": [
                        {
                            "opponent": {
                                "acronym": "KT",
                                "id": 63,
                                "image_url": "https://cdn.pandascore.co/images/team/image/63/kt_rolsterlogo_profile.png",
                                "location": "KR",
                                "modified_at": "2022-01-09T08:25:22Z",
                                "name": "KT Rolster",
                                "slug": "kt-rolster"
                            },
                            "type": "Team"
                        },
                        {
                            "opponent": {
                                "acronym": "BRO",
                                "id": 128218,
                                "image_url": "https://cdn.pandascore.co/images/team/image/128218/fredit_brio_nlogo_square.png",
                                "location": "KR",
                                "modified_at": "2022-02-21T19:45:04Z",
                                "name": "Fredit BRION",
                                "slug": "fredit-brion"
                            },
                            "type": "Team"
                        }
                    ],
                    "detailed_stats": true,
                    "id": 616075,
                    "videogame": {
                        "id": 1,
                        "name": "LoL",
                        "slug": "league-of-legends"
                    },
                    "videogame_version": null,
                    "game_advantage": null,
                    "draw": false,
                    "live_embed_url": "https://player.twitch.tv/?channel=lck_korea",
                    "live": {
                        "opens_at": "2022-02-26T07:45:00Z",
                        "supported": true,
                        "url": "wss://live.pandascore.co/matches/616075"
                    },
                    "results": [
                        {
                            "score": 0,
                            "team_id": 63
                        },
                        {
                            "score": 0,
                            "team_id": 128218
                        }
                    ],
                    "serie_id": 4250,
                    "status": "not_started",
                    "begin_at": "2022-02-26T08:00:00Z",
                    "tournament_id": 7313,
                    "scheduled_at": "2022-02-26T08:00:00Z",
                    "number_of_games": 3,
                    "games": [
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229203,
                            "length": null,
                            "match_id": 616075,
                            "position": 1,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229204,
                            "length": null,
                            "match_id": 616075,
                            "position": 2,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        },
                        {
                            "begin_at": null,
                            "complete": false,
                            "detailed_stats": true,
                            "end_at": null,
                            "finished": false,
                            "forfeit": false,
                            "id": 229205,
                            "length": null,
                            "match_id": 616075,
                            "position": 3,
                            "status": "not_started",
                            "video_url": null,
                            "winner": {
                                "id": null,
                                "type": "Team"
                            },
                            "winner_type": "Team"
                        }
                    ],
                    "original_scheduled_at": "2022-02-26T08:00:00Z",
                    "streams_list": [
                        {
                            "embed_url": null,
                            "language": "en",
                            "main": false,
                            "official": true,
                            "raw_url": "http://www.twitch.tv/lck"
                        },
                        {
                            "embed_url": "https://player.twitch.tv/?channel=lck_korea",
                            "language": "ko",
                            "main": true,
                            "official": true,
                            "raw_url": "https://www.twitch.tv/lck_korea"
                        }
                    ],
                    "name": "KT vs BRO",
                    "match_type": "best_of",
                    "modified_at": "2021-12-31T11:09:33Z"
                }
            ])

    let matches = {}

    const getMatches = (data) => {
        setSerie(data)

        apiPs.get(`/series/${data.id}/matches/past?sort=-begin_at&per_page=30`)
            .then(res => {
                setPastMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        apiPs.get(`/series/${data.id}/matches/running?sort=begin_at`)
            .then(res => {
                setRunningMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        apiPs.get(`/series/${data.id}/matches/upcoming?sort=begin_at&per_page=30`)
            .then(res => {
                setUpcomingMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })  
    }

    const groupMatches = (data) => {
        data.forEach(match => {
            const date = match.scheduled_at.split('T')[0]
            if (matches[date]) {
                matches[date].push(match)
            } else {
                matches[date] = [match]
            }
        })

        return matches
    }
    
    groupMatches(pastMatches)
    groupMatches(runningMatches)
    groupMatches(upcomingMatches)
    

    const renderMatches = []
    for (const dateGroup in matches) {
        renderMatches.push(
            <div className="group-matches" key={dateGroup}>
                <h3 className="date-schedule">{formatDate(dateGroup)}</h3>

                {
                    matches[dateGroup].map(match => {
                        return <MatchCard 
                            match={match}
                        />
                    })
                }
            </div>

        )
    }
    
    /*useEffect(() => {
        apiPs.get(`/series/running?filter[league_id]=${id}`)
        .then(res => {
            res.data[0] !== undefined ? 
            getMatches(res.data[0])
            : 
            apiPs.get(`/series/upcoming?filter[league_id]=${id}`)
            .then(res => {
                if (res.data[0] !== undefined) { getMatches(res.data[0]) }
            })
            .catch (err => {
                console.log(err)
            })
            
        })
        .catch(err => {
            console.log(err)
        })

        setLoading(false)
    }, [])*/

    /*if (!loading) {
        if (serie.length === 0) {
            return (
                <>
                    <h1>Aucune série en cours ou à venir pour cette league</h1>
                </>
            );
        } else {
            return (
                <>
                    <div>
                        <pre>
                            {JSON.stringify(pastMatches, null, 2)}
                            {JSON.stringify(runningMatches, null, 2)}
                            {JSON.stringify(upcomingMatches, null, 2)}
                        </pre>
                    </div>
                </>
            );
        }
    } else {
        return (
            <LoadingPage />
        );
    }*/

    return (
        <>
            <div className="bg-team" style={{ backgroundImage: `url(${serie.league.image_url})` }}></div>

            {renderMatches}
        </>
    );
}