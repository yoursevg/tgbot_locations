const {sequelize} = require('../config/db');
const Location = require('../models/Location');

const locationsData = [
    {
        name: 'ГЭС-2',
        description: 'Современное искусство и архитектура.',
        category: 'Культура',
        latitude: 55.744,
        longitude: 37.622,
        rating: 4.5
    },
    {
        name: 'Тропа сказок в парке Люблино-Кузьминки',
        description: 'Живописная тропа для прогулок.',
        category: 'Природа',
        latitude: 55.684,
        longitude: 37.765,
        rating: 4.7
    },
    {
        name: 'Московский зоопарк',
        description: 'Популярен среди студентов и школьников.',
        category: 'Развлечения',
        latitude: 55.761,
        longitude: 37.582,
        rating: 4.6
    },
    {
        name: 'Парк Горького',
        description: 'Центральный парк культуры и отдыха.',
        category: 'Природа',
        latitude: 55.729,
        longitude: 37.605,
        rating: 4.8
    },
    {
        name: 'Царицыно',
        description: 'Историко-архитектурный и художественный музей-заповедник.',
        category: 'Культура',
        latitude: 55.612,
        longitude: 37.671,
        rating: 4.6
    },
    {
        name: 'Коломенское',
        description: 'Музей-заповедник с историческими постройками.',
        category: 'Природа',
        latitude: 55.676,
        longitude: 37.669,
        rating: 4.7
    },
    {
        name: 'Сокольники',
        description: 'Большой парк с различными зонами отдыха.',
        category: 'Природа',
        latitude: 55.793,
        longitude: 37.678,
        rating: 4.5
    },
    {
        name: 'ВДНХ',
        description: 'Выставочный центр с множеством павильонов и фонтанов.',
        category: 'Культура',
        latitude: 55.829,
        longitude: 37.631,
        rating: 4.7
    },
    {
        name: 'Красная площадь',
        description: 'Обязательное место для посещения в Москве.',
        category: 'Культура',
        latitude: 55.754,
        longitude: 37.621,
        rating: 4.9
    },
    {
        name: 'Александровский сад',
        description: 'Парк возле Кремля с Вечным огнем.',
        category: 'Культура',
        latitude: 55.752,
        longitude: 37.617,
        rating: 4.8
    }
];

const populateLocations = async () => {
    try {
        await sequelize.sync({ force: true }); // Пересоздание таблицы
        await Location.bulkCreate(locationsData);
        console.log('Locations have been populated.');
    } catch (error) {
        console.error('Error populating locations:', error);
    } finally {
        await sequelize.close();
    }
};

populateLocations();