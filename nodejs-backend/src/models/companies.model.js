module.exports = function (app) {
    const modelName = 'companies';
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
                maxLength: 1000000,
                index: true,
                trim: true
            },
            companyNo: {
                type: String,
                required: true,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 3,
                maxLength: 1000000,
                index: true,
                trim: true
            },
            newCompanyNumber: {
                type: Number,
                required: false,
                min: 0,
                max: 100000000
            },
            DateIncorporated: { type: Date, required: false },
            isdefault: { type: Boolean, required: false, default: false },

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
