module.exports = mongoose => {
var schema = mongoose.Schema(
    {
        guest: String,
        message: String,
        published: Boolean
    },
    { timestamps: true }
    );
    schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
    });
    const SaveTheDate = mongoose.model("savethedate", schema);
    return SaveTheDate;
};