module.exports = function (app) {
    const modelName = 'dyna_loader';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            from: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: null,
                maxLength: 50,
                index: false,
                trim: false
            },
            to2: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: null,
                maxLength: 50,
                index: false,
                trim: false,
                default: ''
            },
            name: {
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
