module.exports = function (app) {
    const modelName = 'job_ques';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            name: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: null,
                maxLength: null,
                index: false,
                trim: false
            },
            type: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                maxLength: null,
                index: false,
                trim: false
            },
            fromService: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                maxLength: null,
                index: false,
                trim: false
            },
            toService: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                maxLength: null,
                index: false,
                trim: false
            },
            start: { type: Date, required: false },
            end: { type: Date, required: false },
            jobId: { type: Number, required: false, min: 2, max: 1000000 },
            status: { type: Boolean, required: false, default: false },
            dynaLoaderId: { type: Schema.Types.ObjectId, ref: 'dyna_loader' },
            email: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                index: false,
                trim: false
            },

            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            updatedBy: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            }
        },
        {
            timestamps: true
        }
    );

    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
};
