interface Meal {
    id: number;
    count: number;
    orderId: string;
    status: string;
    type: string;
}

interface Meals {
    breakfast: Meal;
    lunch: Meal;
    dinner:Meal
}

interface OrderInteface {
    id: string;
    name: string;
    status: string;
    price: number;
    createdBy: string;
    createdAt: string; 
    orderedAt: string; 
    meals: Meals;
}

export default OrderInteface;
