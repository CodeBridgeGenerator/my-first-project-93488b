module.exports = function (app) {
    const modelName = 'permission_services';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            service: {
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
            create: { type: Boolean, required: false, default: true },
            read: {
                type: String,
                required: false,
                enum: ['all', 'own', 'subordinates']
            },
            update: {
                type: String,
                required: false,
                enum: ['all', 'own', 'subordinate']
            },
            delete: {
                type: String,
                required: false,
                enum: ['all', 'own', 'subordinate']
            },
            profile: { type: Schema.Types.ObjectId, ref: 'profiles' },
            roleId: { type: Schema.Types.ObjectId, ref: 'roles' },
            positionId: { type: Schema.Types.ObjectId, ref: 'positions' },
            employeeId: { type: Schema.Types.ObjectId, ref: 'employees' },
            userId: { type: Schema.Types.ObjectId, ref: 'users' },

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
