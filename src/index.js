import axios from "axios";
import { Notify } from "notiflix";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '';
axios.defaults.headers.common['x-api-key'] = API_KEY;
