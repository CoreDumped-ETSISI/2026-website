function shuffle(arr) {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function renderCard(post) {
    const card = document.createElement('a');
    card.className = `card tint-${post.tint}`;
    card.href = `/blog/${post.slug}/`;

    const visual = document.createElement('div');
    visual.className = 'card-visual';
    visual.setAttribute('aria-hidden', 'true');
    card.appendChild(visual);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = post.title;
    body.appendChild(title);

    const excerpt = document.createElement('p');
    excerpt.className = 'card-excerpt';
    excerpt.textContent = post.excerpt;
    body.appendChild(excerpt);

    const meta = document.createElement('p');
    meta.className = 'card-meta';
    const time = document.createElement('time');
    time.dateTime = post.date;
    time.textContent = post.date;
    meta.appendChild(time);
    if (post.tags?.length) {
        meta.appendChild(document.createTextNode(' · '));
        const tags = document.createElement('span');
        tags.className = 'card-tags';
        tags.textContent = post.tags.join(', ');
        meta.appendChild(tags);
    }
    body.appendChild(meta);

    card.appendChild(body);
    return card;
}

(async () => {
    const grid = document.getElementById('posts');
    try {
        const response = await fetch('/posts.json');
        if (response.ok) { 
            const json = await response.json();
        }
        // TODO
        for (const post of shuffle(posts)) {
            grid.appendChild(renderCard(post));
        }
    } catch (error) {
        console.error(error);
    }

})();
