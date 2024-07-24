module.exports = function (app) {
    const modelName = 'permission_fields';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            servicePermissionId: {
                type: Schema.Types.ObjectId,
                ref: 'permission_services'
            },
            fieldName: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 3,
                maxLength: 1000000,
                index: true,
                trim: true
            },
            onCreate: { type: Boolean, required: false, default: true },
            onUpdate: { type: Boolean, required: false, default: true },
            onDetail: { type: Boolean, required: false, default: true },
            onTable: { type: Boolean, required: false, default: true },

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
