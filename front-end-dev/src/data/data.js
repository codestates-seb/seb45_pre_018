// 전역 Axios 인스턴스 설정
import axios from 'axios';

const globalAxios = axios.create({
  baseURL: 'http://ec2-13-125-118-42.ap-northeast-2.compute.amazonaws.com:8080', // 기본 URL 설정
  timeout: 5000,
});

export default globalAxios;