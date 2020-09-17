export interface Activity {
    id: number;
    activityType: string;
    liked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    updated: Date;
}

export const ACTIVITY_TYPES: string[] = ['WLP', 'COMMENT', 'LIKE', 'FOLLOW', 'OREDER'];