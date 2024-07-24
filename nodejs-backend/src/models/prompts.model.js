module.exports = function (app) {
    const modelName = 'prompts';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            sessionid: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            chatAiId: {
                type: Schema.Types.ObjectId,
                ref: 'chatai',
                required: true
            },
            configid: {
                type: Schema.Types.ObjectId,
                ref: 'config',
                required: true
            },
            prompt: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            refDocs: { type: Array, required: false },
            responseText: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            systemId: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            type: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            role: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            model: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            params: { type: String },
            stopReason: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            stopSequence: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            inputTokens: { type: Number },
            outputTokens: { type: Number },
            cost: { type: Number },
            status: { type: Boolean },
            error: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            userRemarks: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            thumbsUp: { type: Boolean, default: true },
            thumbsDown: { type: Boolean, default: null },
            copied: { type: Boolean, default: null },
            emailed: { type: Boolean, default: null },
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
