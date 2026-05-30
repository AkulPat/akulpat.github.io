// Unified blog management consolidating recipes and garden entries
const blogKey = 'myBlogEntries';

function loadBlog() {
    const entries = JSON.parse(localStorage.getItem(blogKey) || '[]');
    const container = document.getElementById('blog-container');
    container.innerHTML = '';

    if (entries.length === 0) {
        container.innerHTML = '<p>No blog entries yet. Add one below!</p>';
        return;
    }

    // Sort entries by date (newest first)
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'blog-entry';
        const dateStr = new Date(entry.date).toLocaleDateString();
        entryDiv.innerHTML = `
            <h3>${entry.title}</h3>
            <div class="entry-meta">
                <span class="category-tag">${entry.category}</span>
                <span class="date">${dateStr}</span>
            </div>
            <p>${entry.content}</p>
            <button onclick="deleteBlogEntry(${index})" class="delete-btn">Delete</button>
        `;
        container.appendChild(entryDiv);
    });
}

function saveBlog(entries) {
    localStorage.setItem(blogKey, JSON.stringify(entries));
}

function addBlogEntry(title, category, content) {
    const entries = JSON.parse(localStorage.getItem(blogKey) || '[]');
    entries.push({
        title,
        category,
        content,
        date: new Date().toISOString()
    });
    saveBlog(entries);
    loadBlog();
}

function deleteBlogEntry(index) {
    const entries = JSON.parse(localStorage.getItem(blogKey) || '[]');
    entries.splice(index, 1);
    saveBlog(entries);
    loadBlog();
}

document.getElementById('blog-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('entry-title').value;
    const category = document.getElementById('entry-category').value;
    const content = document.getElementById('entry-content').value;
    addBlogEntry(title, category, content);
    this.reset();
});

// Load blog entries on page load
loadBlog();
