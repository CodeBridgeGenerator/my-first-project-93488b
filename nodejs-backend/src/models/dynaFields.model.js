module.exports = function (app) {
    const modelName = 'dyna_fields';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            dynaLoader: { type: Schema.Types.ObjectId, ref: 'dyna_loader' },
            from: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 150,
                index: true,
                trim: true
            },
            fromType: { type: Schema.Types.Mixed, required: true },
            to2: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 150,
                index: true,
                trim: true
            },
            toType: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 150,
                index: true,
                trim: true,
                default: ''
            },
            fromService: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 0,
                maxLength: 150,
                index: true,
                trim: true
            },
            toService: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 0,
                maxLength: 150,
                index: true,
                trim: true,
                default: ''
            },
            toRefService: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 0,
                maxLength: 150,
                index: true,
                trim: true
            },
            identifierFieldName: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 0,
                maxLength: 150,
                index: true,
                trim: true
            },
            duplicates: { type: Boolean, required: true, default: false },

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
