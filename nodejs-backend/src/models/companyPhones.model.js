module.exports = function (app) {
    const modelName = 'company_phones';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            companyId: { type: Schema.Types.ObjectId, ref: 'companies' },
            countryCode: {
                type: Number,
                required: false,
                min: 0,
                max: 100000000
            },
            operatorCode: {
                type: Number,
                required: false,
                min: 0,
                max: 100000000
            },
            number: { type: Number, required: false, min: 0, max: 100000000 },
            type: {
                type: String,
                required: false,
                enum: ['Land line', 'Mobile', 'Fax']
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
