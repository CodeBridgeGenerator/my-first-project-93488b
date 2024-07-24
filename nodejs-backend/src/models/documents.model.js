module.exports = function (app) {
    const modelName = 'cbdocuments';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
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
            projectid: {
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
            env: {
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
            url: {
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
            collection: {
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
            size: { type: Number, required: false, min: 0, max: 100000000 },

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
