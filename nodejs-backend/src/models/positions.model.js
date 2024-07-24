module.exports = function (app) {
    const modelName = 'positions';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            roleId: { type: Schema.Types.ObjectId, ref: 'roles' },
            name: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 3,
                maxLength: 100000000,
                index: true,
                trim: true
            },
            description: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 3,
                maxLength: 100000000,
                index: true,
                trim: true
            },
            abbr: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000000,
                index: true,
                trim: true
            },
            isDefault: { type: Boolean, required: false, default: false },

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
