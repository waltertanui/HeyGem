# HeyGen API Integration Guide

## Overview
The HeyGen API integration provides functionality for:
- Video generation
- Text-to-speech conversion
- Task management
- Status checking

## API Endpoints
1. Video Generation
   - Endpoint: /video
   - Methods: POST, GET
   - Parameters: { video_data, model_id, etc. }

2. Text-to-Speech
   - Endpoint: /tts
   - Methods: POST, GET
   - Parameters: { text, voice_id, etc. }

## Authentication
- API Key required for all endpoints
- Token-based authentication

## Error Handling
- Standard HTTP status codes
- Detailed error messages

## Rate Limiting
- Max 10 requests per second
- Retry mechanism implemented

## Examples
```javascript
// Example API call
const response = await heyGenAPI.createVideoTask(videoData);