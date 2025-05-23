const uploadInput = document.getElementById("upload");
const image = document.getElementById("image");
const resultElement = document.getElementById("result");

// Load the custom image classification model
const customModelPath =
  "https://teachablemachine.withgoogle.com/models/HKDd-d3pS/model.json"; // Replace this with the path to your model.json
const classifier = ml5.imageClassifier(customModelPath, modelLoaded);

const classifier2 = ml5.imageClassifier("MobileNet", model2Loaded);

// Callback when the model is loaded
function modelLoaded() {
  resultElement.innerText = "Custom model loaded! Upload an image to classify.";
}

function model2Loaded() {
  console.log("Image loaded");
}

// Handle image upload
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result; // Set the uploaded image as the source
      classifyImage();
    };
    reader.readAsDataURL(file);
  }
});

// Function to classify the uploaded image
function classifyImage() {
  resultElement.innerText = "Classifying...";
  classifier.classify(image, (error, results) => {
    if (error) {
      console.error("Classification error:", error);
      resultElement.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      return;
    }

    console.log("Classification results:", results);

    if (results && results.length > 0) {
      // Find the result with the highest confidence
      const topResult = results.reduce((max, result) =>
        result.confidence > max.confidence ? result : max
      );

      // Display the top result below the image
      resultElement.innerHTML = `
                        <p>Label: <strong>${topResult.label}</strong></p>
                        <p>Confidence: <strong>${(
                          topResult.confidence * 100
                        ).toFixed(2)}%</strong></p>
                    `;
    } else {
      resultElement.innerHTML = '<p class="error">No results found.</p>';
    }
  });

  classifier2.classify(image, (error, results) => {
    if (error) {
      console.log(error);
    }

    console.log("Classification results:", results);

    if (results && results.length > 0) {
      console.log(results);
    }
  });
}
