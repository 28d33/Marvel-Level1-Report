import numpy as np
import matplotlib.pyplot as plt

# Load the scrambled matrix
encoded_array = np.load("encoded_array.npy")

# Reshapeing
decoded_image = encoded_array.reshape((100, 100))

# Rotate
rotated_image = np.rot90(decoded_image, k=-1)

# Print
plt.imshow(rotated_image)
plt.axis("off")
plt.show()

