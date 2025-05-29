const bubbleContainer = document.querySelector(".bubbles");

function createBubble() {
	const bubble = document.createElement("div");
	bubble.classList.add("bubble");

	// position horizontale aléatoire
	bubble.style.left = `${Math.random() * 100}%`;

	// position verticale aléatoire (de 40% a 90%)
	const topPosition = 40 + Math.random() * 50;
	bubble.style.top = `${topPosition}%`;

	// Taille aléatoire
	const size = Math.random() * 10 + 5;
	bubble.style.width = `${size}px`;
	bubble.style.height = `${size}px`;

	// Durée d'animation aléatoire
	bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;

	bubbleContainer.appendChild(bubble);

	// Supprimer la bulle après l'animation
	setTimeout(() => {
		bubble.remove();
	}, 6000);
}

// Créer des bulles a intervalle régulier
setInterval(createBubble, 500);