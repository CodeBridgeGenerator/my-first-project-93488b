module.exports = function (app) {
    const modelName = 'chatai';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            name: {
                type: String,
                required: true,
                unique: true,
                lowercase: false,
                default: ''
            },
            description: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
            },
            serviceName: {
                type: String,
                unique: false,
                lowercase: false,
                default: ''
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
