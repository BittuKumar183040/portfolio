import ecom1 from '../ecommerce/ecommerce1.jpg';
import ecom2 from '../ecommerce/ecommerce2.jpg';
import ecom3 from '../ecommerce/ecommerce3.jpg';
import ecom4 from '../ecommerce/ecommerce4.jpg';

import tic1 from '../tictac/tic1.jpg';
import tic2 from '../tictac/tic2.jpg';
import tic3 from '../tictac/tic3.jpg';

import adv from '../advice/adv1.jpg';

export const projects = [
  {
    id: '48825cc4-583a-428f-bfd0-f3f062d1692a',
    title: 'Shopping Website | ShowWithUs.',
    shortDesc:
      'E-commerce website demonstrates my ability to create aesthetic and functional web applications, providing a seamless user experience with advanced modern features.',
    description: `<div class=" max-w-3xl mx-auto">
      <h2 class="text-3xl text-left font-bold text-blue-600 dark:text-blue-400 mb-6 ">
        E-commerce Website Overview
      </h2>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        I developed a fully functional <b>E-commerce website</b> incorporating various features to enhance the shopping experience. This project demonstrates my expertise in <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>.
      </p>
      <h3 class="text-xl font-semibold text-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text mb-4">
        Key Features
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-start space-x-4">
          <div class="text-green-600 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">Product Lists</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Displays an attractive and responsive product catalog.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <div class="text-red-600 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">Shopping Cart</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Dynamic updates for items, quantities, and prices.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <div class="text-yellow-600 dark:text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">Product Suggestions</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Smart recommendations based on user preferences.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <div class="text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">Google Login</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Seamless and secure authentication via Google.</p>
          </div>
        </div>
      </div>
      <div class="py-6">
        <h3 class="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Technology Stack
        </h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          This E-commerce website was built using advanced technologies to deliver a modern and seamless experience:
        </p>
        <div class="space-y-4 text-gray-800 dark:text-gray-300">
          <div>
            <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              React JS
            </h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><i>Redux</i>: State management for efficient data flow.</li>
              <li><i>React Router DOM</i>: Dynamic routing for navigation.</li>
              <li><i>Lazy Loading</i>: Optimized performance with code-splitting.</li>
              <li><i>Toast Notifications</i>: For user feedback on actions.</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              Tailwind CSS
            </h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><i>Utility-first</i>: Simplified and responsive styling.</li>
              <li><i>Custom Themes</i>: Adaptable design tailored to user needs.</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              Google OAuth
            </h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><i>Secure Login</i>: Ensures data privacy and quick authentication.</li>
              <li><i>Seamless Integration</i>: User-friendly account access.</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
              Demo Account
            </h4>
            <ul class="list-disc pl-5 space-y-1">
              <li><i>Explore</i>: Provided Demo Account login to look around</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
    imageSource: [ecom1, ecom2, ecom3, ecom4],
    gitLink: 'https://github.com/BittuKumar183040/ShopWithUs',
    previewLink: 'https://sw-us.vercel.app',
  },
  {
    id: '4626bae8-3fb8-481c-a6dd-22d7e3e9cd53',
    title: 'Tic Tac Toe',
    shortDesc:
      '-An interactive tic tac toe game with smooth animation build using Vanilla Javascript, HTML and CSS',
    description: `<div class=" max-w-3xl mx-auto">
      <h3 class="text-3xl text-left font-bold text-blue-600 dark:text-blue-400 mb-6 ">
        Project: Tic-Tac-Toe Game
      </h3>
      <p class="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
        Tic-Tac-Toe is a classic two-player game where players take turns marking spaces in a 3x3 grid. The first player to align three of their marks (either "X" or "O") in a row, column, or diagonal wins.
      </p>
      <div class="space-y-4 text-gray-800 dark:text-gray-300">
        <div>
          <h4 class="text-lg font-bold text-pink-600 dark:text-pink-400 mb-2">
            HTML
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Game Layout</i>: Basic structure for the Tic-Tac-Toe grid.</li>
            <li><i>Accessibility</i>: Ensuring all game elements are accessible to users.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">
            CSS
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Responsive Design</i>: Optimized for mobile and desktop views.</li>
            <li><i>CSS Animations</i>: Adding smooth transitions and effects when a player wins or makes a move.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            Vanilla JavaScript
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Event Handling</i>: Detecting player clicks and managing game flow.</li>
            <li><i>Problem Solving</i>: Implementing the game logic to check for a winner or a tie.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            Google Fonts
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Typography</i>: Using custom fonts to enhance the game’s UI design.</li>
          </ul>
        </div>
      </div>
    </div>`,
    imageSource: [tic1, tic2, tic3],
    gitLink: 'https://github.com/BittuKumar183040/tictac',
    previewLink: 'https://bittukumar183040.github.io/tictac',
  },
  {
    id: '83e31225-b967-4343-8b70-a5e17446955a',
    title: 'Advice Generator App',
    shortDesc: 'By using APIs, this app generates a random advice for you.',
    description: `<div class=" max-w-3xl mx-auto">
      <h3 class="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
        Advice Generator App
      </h3>
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        This app provides random advice for each day, with an option for users to fetch new advice at the click of a button.
      </p>
      <div class="space-y-4 text-gray-800 dark:text-gray-300">
        <div>
          <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
            HTML
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Semantic Structure</i>: Clean and organized HTML for easy maintenance.</li>
            <li><i>Accessibility</i>: Proper use of ARIA roles and tags.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
            CSS
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>Responsive Design</i>: Optimized for different screen sizes.</li>
            <li><i>Modern Styling</i>: Use of flexbox and grid for layout.</li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
            Vanilla JavaScript
          </h4>
          <ul class="list-disc pl-5 space-y-1">
            <li><i>JS Events</i>: Interactive button click to fetch new advice.</li>
            <li><i>API Handling</i>: Fetching random advice from a public API.</li>
          </ul>
        </div>
      </div>
    </div>`,
    imageSource: [adv],
    gitLink: 'https://github.com/BittuKumar183040/Advice-Generator',
    previewLink: 'https://bittukumar183040.github.io/Advice-Generator/',
  },
];
