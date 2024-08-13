import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://zisqqzpvrnzuuswrzton.supabase.co';
const supabaseKey = 'your-supabase-key-here'; // ใส่คีย์ Supabase ของคุณที่นี่
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            throw error;
        }

        const dataList = document.getElementById('data-list');
        if (data && data.length > 0) {
            dataList.innerHTML = `
                <h2>Products</h2>
                <ul>
                    ${data.map(item => `<li>ID: ${item.id}, Name: ${item.name}, Price: $${item.price}</li>`).join('')}
                </ul>`;
        } else {
            dataList.innerHTML = '<p>No products found.</p>';
        }

        document.getElementById('status').textContent = 'Data fetched successfully.';
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('status').textContent = 'Error fetching data: ' + error.message;
    }
}

// Fetch data when the page loads
fetchData();
