module.exports = function (app) {
    const modelName = 'user_invites';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            emailToInvite: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: null,
                maxLength: null,
                index: false,
                trim: false
            },
            status: { type: Boolean, required: false, default: false },
            code: { type: Number, required: false, min: 0, max: 1000000 },
            sendMailCounter: {
                type: Number,
                required: false,
                min: 0,
                max: 10000000,
                default: 0
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
