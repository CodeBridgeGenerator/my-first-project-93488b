
    module.exports = function (app) {
        const modelName = 'products';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sku: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false, default: null },
name: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
brand: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
price: { type: Number, required: false, min: 0, max: 1000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };