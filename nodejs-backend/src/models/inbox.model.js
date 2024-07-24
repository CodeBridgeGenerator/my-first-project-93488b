module.exports = function (app) {
    const modelName = 'inbox';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            from: { type: Schema.Types.ObjectId, ref: 'users' },
            toUser: { type: Schema.Types.ObjectId, ref: 'users' },
            content: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                index: false,
                trim: false
            },
            read: { type: Boolean, required: false, default: false },
            sent: { type: Date, required: false },

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
