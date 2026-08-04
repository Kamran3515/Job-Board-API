export function animateCards(selector = ".job-card") {

    const cards = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15,
        }

    );

    cards.forEach((card) => observer.observe(card));

}