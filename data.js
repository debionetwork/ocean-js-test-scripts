const testData = {
  main: {
    type: "dataset",
    name: "anolis-test-dataset",
    dateCreated: new Date(Date.now()).toISOString().split(".")[0] + "Z",
    author: "Alice",
    license: "MIT",
    files: [
      {
        url: "https://radcamp.github.io/Yale2019/Prates_et_al_2016_example_data/anolis.vcf",
        contentType: "vcf",
      },
    ],
  },
 };
  
 module.exports = { testData };