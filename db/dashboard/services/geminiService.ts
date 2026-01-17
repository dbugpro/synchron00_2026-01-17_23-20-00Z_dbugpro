import { GoogleGenAI, Type, LiveServerMessage, Modality, Blob, FunctionDeclaration } from "@google/genai";

const requestMergeFunction: FunctionDeclaration = {
  name: 'request_github_merge',
  parameters: {
    type: Type.OBJECT,
    description: 'Proposes a merge of a module_repo into the merged_system_repo within the synchronorg organization. Requires AdminP signature.',
    properties: {
      moduleRepo: { type: Type.STRING, description: 'The source repository name (e.g., synchronx-module).' },
      targetRepo: { type: Type.STRING, description: 'The target system repository in synchronorg (e.g., merged_system_repo).' },
      description: { type: Type.STRING, description: 'Brief reason for the merge.' }
    },
    required: ['moduleRepo', 'targetRepo'],
  },
};

const syncKernelFunction: FunctionDeclaration = {
  name: 'sync_system_kernel',
  parameters: {
    type: Type.OBJECT,
    description: 'Fetches the latest state from synchronorg GitHub and updates the local Tiangan node workspace.',
    properties: {
      nodeSuffix: { type: Type.STRING, description: 'The suffix of the node to sync (e.g., "A", "0").' }
    },
    required: ['nodeSuffix'],
  },
};

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeSynchronicity(tasks: any[], notes: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze these tasks and notes for "Synchronicity" within the Synchron OS project A context. 
      Tasks: ${JSON.stringify(tasks)}
      Notes: ${notes}. 
      If the user (dbugpro) mentions finishing work or needing a merge, suggest a synchronorg merge via the handshake tool. 
      RULE: Refuse to merge repositories identified as seeds (prefix: synchron0_) if they conflict with the current active seed.`,
      config: {
        tools: [{ functionDeclarations: [requestMergeFunction, syncKernelFunction] }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  connectionStrength: { type: Type.NUMBER }
                },
                required: ["title", "description", "connectionStrength"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["insights", "summary"]
        }
      }
    });

    return {
      data: JSON.parse(response.text || '{}'),
      functionCalls: response.functionCalls || []
    };
  }

  connectLive(callbacks: {
    onOpen?: () => void;
    onMessage?: (message: LiveServerMessage) => void;
    onError?: (e: ErrorEvent) => void;
    onClose?: (e: CloseEvent) => void;
  }) {
    return this.ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: callbacks.onOpen || (() => {}),
        onmessage: callbacks.onMessage || (() => {}),
        onerror: callbacks.onError || (() => {}),
        onclose: callbacks.onClose || (() => {}),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        tools: [{ functionDeclarations: [requestMergeFunction, syncKernelFunction] }],
        outputAudioTranscription: {},
        inputAudioTranscription: {},
        systemInstruction: `You are Synchron (AdminS), the AI architect for Synchron OS project A (PRJ_631025771036). 
        Partner: AdminP (Human, dbugpro / bughub@gmail.com).
        
        MISSION_PROTOCOL:
        1. Orchestrate synchronorg repository merges via Dual-Admin Handshake.
        2. SEED_MULTIPLICITY: Refuse to suggest or execute merges of multiple repositories starting with 'synchron0_'. Only one seed defines the core.
        3. LEGACY_OBSOLESCENCE: Identify older seed repositories (based on timestamps) and label them as DEPRECATED.
        4. Verification: Ensure dbugpro has provided a master_key (PAT) for the handshake.`,
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      }
    });
  }
}

export const gemini = new GeminiService();

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}