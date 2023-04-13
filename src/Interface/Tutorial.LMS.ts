import mongoose from "mongoose";


export interface ITutorial extends mongoose.Document {
    TutorialTitle: string;
    TutorialDescription: string;
    thumbnail: {
        location: string;
        key: string;
    }
    moduleNumber: Number;
    intiater: mongoose.Schema.Types.ObjectId
    module: [
        {
            moduleTitle: string;
            moduleDescription: string;
        }
    ];
    chapter: [
        {
            chapterTitle: string;
            chapterDescription: string;
        }
    ];
    category: string;
    isDeleted: boolean;
}