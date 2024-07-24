module.exports = function (app) {
    const modelName = 'staffinfo';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            empno: { type: Number, required: false, min: 0, max: 1000000 },
            name: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            namenric: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            compcode: { type: Number, required: false, min: 0, max: 10000000 },
            compname: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            deptcode: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            deptdesc: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            sectcode: { type: Number, required: false, min: 0, max: 50035066 },
            sectdesc: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            designation: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            email: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            resign: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            supervisor: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            datejoin: { type: Number, required: false, min: 0, max: 10000000 },
            empgroup: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            empgradecode: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
            },
            terminationdate: {
                type: String,
                required: false,
                unique: false,
                lowercase: false,
                uppercase: false,
                minLength: 2,
                maxLength: 1000,
                index: true,
                trim: true
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
