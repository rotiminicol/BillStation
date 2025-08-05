# Onboarding Features - Nationality and Place of Birth

## Overview
The onboarding process now includes enhanced nationality and place of birth selection using dropdown menus with API integration for better user experience and data accuracy.

## Features

### Nationality Dropdown
- **Dynamic Loading**: Countries are loaded from the REST Countries API (https://restcountries.com/v3.1/all)
- **Fallback Support**: Comprehensive fallback list of 200+ countries if API is unavailable
- **Alphabetical Sorting**: Countries are sorted A-Z for easy navigation
- **Loading States**: Shows loading indicator while fetching countries
- **Error Handling**: Graceful error handling with user-friendly messages

### Place of Birth Dropdown
- **Dependent Selection**: Place of birth dropdown is enabled only after nationality is selected
- **Dynamic States/Provinces**: Loads states/provinces based on selected country
- **Built-in Support**: Pre-configured states for major countries:
  - Nigeria (36 states + FCT)
  - United States (50 states)
  - Canada (13 provinces/territories)
  - United Kingdom (4 countries)
  - Australia (8 states/territories)
- **Manual Input Fallback**: Text input field appears when states are not available for a country
- **Loading States**: Shows loading indicator while fetching states
- **Validation**: Ensures place of birth is selected when states are available

## API Integration

### Countries API
- **Primary**: REST Countries API (free, no API key required)
- **Endpoint**: `https://restcountries.com/v3.1/all?fields=name,cca2,cca3`
- **Data**: Returns country name, ISO 2-letter code, and ISO 3-letter code
- **Fallback**: Comprehensive static list of 200+ countries

### States API
- **Primary**: CountryStateCity API (requires free API key)
- **Endpoint**: `https://api.countrystatecity.in/v1/countries/{countryCode}/states`
- **Built-in**: Pre-configured states for major countries
- **Fallback**: Empty array for countries without states data

## User Experience

### Flow
1. User selects nationality from dropdown (countries loaded from API)
2. Place of birth dropdown becomes enabled
3. States/provinces are loaded based on selected country
4. If states are available, user selects from dropdown
5. If no states available, manual text input appears
6. Form validation ensures required fields are completed

### Error Handling
- Network errors show user-friendly messages
- Loading states prevent user confusion
- Graceful degradation when APIs are unavailable
- Clear validation messages for required fields

## Technical Implementation

### Components Modified
- `src/pages/Onboarding.tsx`: Main onboarding form
- `src/services/api.ts`: API service functions

### Key Functions
- `fetchCountries()`: Loads countries from API with fallback
- `fetchStates(countryCode)`: Loads states for specific country
- `useEffect` hooks: Manage data loading and state updates

### State Management
- `countries`: Array of available countries
- `states`: Array of states for selected country
- `loadingCountries`: Loading state for countries
- `loadingStates`: Loading state for states
- `formData.nationality`: Selected nationality
- `formData.placeOfBirth`: Selected place of birth

## Benefits

1. **Data Accuracy**: Prevents typos and ensures consistent data entry
2. **User Experience**: Faster selection with dropdowns vs manual typing
3. **Validation**: Built-in validation ensures required data is captured
4. **Scalability**: Easy to add more countries and states
5. **Reliability**: Multiple fallback mechanisms ensure functionality
6. **Performance**: Efficient API calls with proper loading states

## Future Enhancements

1. **Caching**: Implement local storage caching for countries/states
2. **Search**: Add search functionality to dropdowns for large lists
3. **More Countries**: Expand built-in states support for more countries
4. **Geolocation**: Auto-detect user's country based on IP
5. **Translations**: Support for multiple languages 