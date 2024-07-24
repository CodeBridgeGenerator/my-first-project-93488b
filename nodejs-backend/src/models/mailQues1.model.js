module.exports = function (app) {
    const modelName = 'mail_ques';
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
            from: {
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
            recipients: {
                type: [String],
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: null,
                maxLength: null,
                index: false,
                trim: false
            },
            status: { type: Boolean, required: false, default: false },
            data: { type: Schema.Types.Mixed },
            templateId: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                index: false,
                trim: false
            },
            subject: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                index: false,
                trim: false
            },
            content: {
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
            jobId: { type: Number, required: false, min: 2, max: 1000000 },
            errors: {
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
            end: { type: Date, required: false }
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
