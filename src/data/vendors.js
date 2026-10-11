const vendors=[
    {
        id: 'my-restaurant',
        name: 'Mahallah bilal catering',
        location: 'Mahallah bilal block A',
        openHours: '6:00 AM - 10:00 PM',
        isOpen: true,
        menu: [
            {id: 'my-1', name: 'Chicken Rice', description: 'Yellow rice with grilled chicken', price: 8.00, category: 'Main Course', available: true},
            {id: 'my-2', name: 'Beef Burger', description: 'Juicy beef patty with cheese and lettuce', price: 6.50, category: 'Main Course', available: true},
            {id: 'my-3', name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing', price: 5.00, category: 'Salad', available: true},
            {id: 'my-4', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache frosting', price: 4.50, category: 'Dessert', available: true},
            {id: 'my-5', name: 'Lemonade', description: 'Refreshing lemonade with a hint of mint', price: 2.50, category: 'Beverage', available: true}
        ],
    },
    {
        id: 'kafe-faruq',
        name: 'Kafe mahallah faruq',
        location: 'Mahallah Faruq block A',
        openHours: '6:00 AM - 10:00 PM',
        isOpen: true,
        menu: [
            {id: 'kb-1', name: 'Nasi ayam gepuk', description: 'Fried chicken with rice', price: 8.00, category: 'Main Course', available: true},
            {id: 'kb-2', name: 'Pizza', description: 'Tomato sauce, mozzarella, and pepperoni', price: 8.00, category: 'Main Course', available: true},
            {id: 'kb-3', name: 'Air bandung', description: 'Rose syrup with milk', price: 2.50, category: 'Beverage', available: true},
        ],
    },
]

export default vendors