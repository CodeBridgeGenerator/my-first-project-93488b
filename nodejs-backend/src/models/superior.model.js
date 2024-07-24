module.exports = function (app) {
    const modelName = 'superior';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            superior: { type: Number, required: false, min: 0, max: 10000000 },
            subordinate: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                maxLength: null,
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
