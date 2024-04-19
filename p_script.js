function checkImageColor() {
    const image = document.getElementById("image_1");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const pixelCount = canvas.width * canvas.height;
    let redPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
       const red = data[i];
       const green = data[i + 1];
       const blue = data[i + 2];

       if (red > green + blue) {
          redPixels++;
       }
    }

    const redPercentage = (redPixels / pixelCount) * 100;

    let resultMessage = '';
    if (redPercentage > 50) {
       resultMessage = 'The image is reddish.';
    } else {
       resultMessage = 'The image is not reddish.';
    }

    const resultElement = document.getElementById('result');
    resultElement.innerText = resultMessage;
  }
  function makeImageReddish() {
    const image = document.getElementById("image_2");
    manipulateImage(image, 'reddish');
}

function makeImageBlueish() {
    const image = document.getElementById("image_2");
    manipulateImage(image, 'blueish');
}

function makeImageGreenish() {
    const image = document.getElementById("image_2");
    manipulateImage(image, 'greenish');
}

function manipulateImage(image, type) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];

        if (type === 'reddish') {
            if (red <= green + blue) {
                red = green + blue;
            }
        } else if (type === 'blueish') {
            if (blue <= red + green) {
                blue = red + green;
            }
        } else if (type === 'greenish') {
            if (green <= red + blue) {
                green = red + blue;
            }
        }
        data[i] = red;
        data[i + 1] = green;
        data[i + 2] = blue;
    }
    ctx.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();
}
function duplicateImage() {
    const originalImage = document.getElementById("image_3");
    const cloneImage = originalImage.cloneNode(true); 
    const container = originalImage.parentNode;
    container.appendChild(cloneImage);
}
function increaseBrightness() {
    const image = document.getElementById("image_4");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const brightnessIncrease = 50; 
    for (let i = 0; i < data.length; i += 4) {
       data[i] += brightnessIncrease; 
       data[i + 1] += brightnessIncrease; 
       data[i + 2] += brightnessIncrease; 
    }
    ctx.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL();
}
function reduceResolution() {
    const image = document.getElementById("image_5");
     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');
     const newWidth = image.width / 2;
     const newHeight = image.height / 2;
     canvas.width = newWidth;
     canvas.height = newHeight;
     ctx.drawImage(image, 0, 0, newWidth, newHeight);
     image.src = canvas.toDataURL();
  }
function createAvatar() {
    const originalImage = document.getElementById("image_6");
    const canvas = document.getElementById("avatarCanvas");
    const context = canvas.getContext("2d");

// Define the avatar size (adjust width and height as needed)
    const avatarSize = Math.min(canvas.width, canvas.height);

// Clip a circular region from the original image
    context.beginPath();
    context.arc(avatarSize / 2, avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI);
    context.clip();
    context.drawImage(originalImage, 0, 0, originalImage.naturalWidth, originalImage.naturalHeight, 0, 0, avatarSize, avatarSize);
}
function convertToGrayscale() {
    var image = document.getElementById("image_7");
    var originalWidth = image.width;
    var originalHeight = image.height;
    canvas.width = originalWidth;
    canvas.height = originalHeight;
    ctx.drawImage(image, 0, 0, originalWidth, originalHeight);

    var imageData = ctx.getImageData(0, 0, originalWidth, originalHeight);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        var grayscale = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
        data[i] = grayscale; 
        data[i + 1] = grayscale; 
        data[i + 2] = grayscale; 
    }

    ctx.putImageData(imageData, 0, 0);

    image.src = canvas.toDataURL();
}

function generateQRCode(){
    const qrCode = new QRCodeStyling({
      width: 170,
      height: 170,
      type: "svg",
      data: imagePath,
    });
  
    const canvas = document.getElementById("image_8");
    canvas.innerHTML = ""; 
    qrCode.append(canvas5); 
}
function applyFilter(filter) {
    var image = document.getElementById('filter');
  
    switch (filter) {
        case 'none':
            image.style.filter = 'none';
            break;
        case 'grayscale':
            image.style.filter = 'grayscale(100%)';
            break;
        case 'sepia':
            image.style.filter = 'sepia(100%)';
            break;
        case 'invert':
            image.style.filter = 'invert(100%)';
            break;
        default:
            image.style.filter = 'none';
    }
  }
