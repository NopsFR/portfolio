'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Section } from '@/components/layout';
import { 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaCamera, 
  FaFingerprint, 
  FaCookieBite, 
  FaNetworkWired,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaLock,
  FaUserSecret,
  FaEye,
  FaDatabase,
  FaBug,
  FaCode,
  FaFish
} from 'react-icons/fa';

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

interface BrowserFingerprint {
  userAgent: string;
  language: string;
  languages: readonly string[];
  platform: string;
  screenResolution: string;
  colorDepth: string;
  timezone: string;
  cookieEnabled: boolean;
  doNotTrack: string;
  hardwareConcurrency: number;
  deviceMemory: number;
  touchPoints: number;
  webGLVendor: string;
  webGLRenderer: string;
}

interface NetworkInfo {
  online: boolean;
  connectionType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export function SecurityDemo() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [ipLoading, setIpLoading] = useState(true);
  const [ipError, setIpError] = useState<string | null>(null);
  
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const [fingerprint, setFingerprint] = useState<BrowserFingerprint | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [cookies, setCookies] = useState<{ name: string; value: string }[]>([]);
  
  const [activeTab, setActiveTab] = useState('overview');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch IP information
  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        if (!response.ok) throw new Error('Failed to fetch IP info');
        const data = await response.json();
        setIpInfo(data);
      } catch (err) {
        setIpError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIpLoading(false);
      }
    };
    fetchIpInfo();
  }, []);

  // Collect browser fingerprint
  useEffect(() => {
    const collectFingerprint = async () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') as WebGLRenderingContext | null || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      
      let webGLVendor = 'Not available';
      let webGLRenderer = 'Not available';
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          webGLVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string || 'Unknown';
          webGLRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string || 'Unknown';
        }
      }

      const fp: BrowserFingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages || [],
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: `${screen.colorDepth}-bit`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack || 'Unspecified',
        hardwareConcurrency: navigator.hardwareConcurrency || 0,
        deviceMemory: (navigator as any).deviceMemory || 0,
        touchPoints: navigator.maxTouchPoints || 0,
        webGLVendor,
        webGLRenderer,
      };
      
      setFingerprint(fp);
    };
    collectFingerprint();
  }, []);

  // Get network information
  useEffect(() => {
    const getNetworkInfo = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      
      const info: NetworkInfo = {
        online: navigator.onLine,
        connectionType: connection ? (connection.effectiveType || 'unknown') : 'unknown',
        downlink: connection ? (connection.downlink || 0) : 0,
        rtt: connection ? (connection.rtt || 0) : 0,
        saveData: connection ? (connection.saveData || false) : false,
      };
      
      setNetworkInfo(info);
    };
    getNetworkInfo();
  }, []);

  // Get cookies
  useEffect(() => {
    const getCookies = () => {
      const cookiePairs = document.cookie.split(';').map(cookie => {
        const [name, ...valueParts] = cookie.trim().split('=');
        return { name: name.trim(), value: valueParts.join('=').trim() };
      });
      setCookies(cookiePairs);
    };
    getCookies();
  }, []);

  const requestGeolocation = () => {
    setGeoLoading(true);
    setGeoError(null);
    
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by this browser');
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation(position.coords);
        setGeoLoading(false);
      },
      (error) => {
        setGeoError(error.message);
        setGeoLoading(false);
      }
    );
  };

  const requestCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError(err instanceof Error ? err.message : 'Camera access denied');
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const setTestCookie = () => {
    const name = `test_cookie_${Date.now()}`;
    const value = `value_${Math.random().toString(36).substring(7)}`;
    document.cookie = `${name}=${value}; max-age=3600; path=/`;
    setCookies(prev => [...prev, { name, value }]);
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    setCookies(prev => prev.filter(c => c.name !== name));
  };

  const generateFingerprintHash = useCallback(() => {
    if (!fingerprint) return 'N/A';
    const data = JSON.stringify(fingerprint);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }, [fingerprint]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaShieldAlt },
    { id: 'ip', label: 'IP & Location', icon: FaGlobe },
    { id: 'geolocation', label: 'Geolocation', icon: FaMapMarkerAlt },
    { id: 'camera', label: 'Camera', icon: FaCamera },
    { id: 'fingerprint', label: 'Fingerprint', icon: FaFingerprint },
    { id: 'cookies', label: 'Cookies', icon: FaCookieBite },
    { id: 'network', label: 'Network', icon: FaNetworkWired },
    { id: 'threats', label: 'Threats', icon: FaUserSecret },
  ];

  return (
    <Section id="security-demo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Cybersecurity Education Demo
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interactive demonstration showing what data websites can access through your browser.
            Understanding these capabilities is essential for protecting your privacy and security online.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="text-sm" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">
                    {ipLoading ? '...' : ipInfo?.ip || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-400">Your Public IP</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {fingerprint ? '✓' : '...'}
                  </div>
                  <div className="text-sm text-gray-400">Fingerprint Collected</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {cookies.length}
                  </div>
                  <div className="text-sm text-gray-400">Active Cookies</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {networkInfo?.online ? 'Online' : 'Offline'}
                  </div>
                  <div className="text-sm text-gray-400">Connection Status</div>
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <FaInfoCircle />
                  What You'll Learn
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• How your IP address reveals your location</li>
                  <li>• What browser fingerprinting can reveal about you</li>
                  <li>• How websites track you with cookies</li>
                  <li>• What permissions websites can request</li>
                  <li>• Common attack vectors and how to protect yourself</li>
                </ul>
              </div>
            </div>
          )}

          {/* IP & Location */}
          {activeTab === 'ip' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaGlobe className="text-cyan-400" />
                IP Address & Location
              </h3>
              {ipLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                </div>
              ) : ipError ? (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
                  Error: {ipError}
                </div>
              ) : ipInfo && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-300 mb-3">Your IP Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="font-mono text-white">{ipInfo.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">City:</span>
                        <span className="text-white">{ipInfo.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Region:</span>
                        <span className="text-white">{ipInfo.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Country:</span>
                        <span className="text-white">{ipInfo.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ISP:</span>
                        <span className="text-white text-xs">{ipInfo.org}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-300 mb-2 flex items-center gap-2">
                      <FaExclamationTriangle />
                      Security Implications
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• IP addresses can reveal your city/region</li>
                      <li>• ISPs can be used to identify your provider</li>
                      <li>• VPNs and proxies can mask your real IP</li>
                      <li>• Some sites use IP for geo-blocking</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Geolocation */}
          {activeTab === 'geolocation' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-400" />
                Browser Geolocation
              </h3>
              <p className="text-gray-400 text-sm">
                Modern browsers can access your precise location through GPS, Wi-Fi, and cell tower data.
              </p>
              <button
                onClick={requestGeolocation}
                disabled={geoLoading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
              >
                {geoLocation ? 'Update Location' : 'Request Location Access'}
              </button>
              {geoError && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 text-sm">
                  {geoError}
                </div>
              )}
              {geoLocation && (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">Your Location Data</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Latitude:</span>
                      <span className="font-mono text-white">{geoLocation.latitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Longitude:</span>
                      <span className="font-mono text-white">{geoLocation.longitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-white">{geoLocation.accuracy} meters</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Camera */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaCamera className="text-purple-400" />
                Camera Access
              </h3>
              <p className="text-gray-400 text-sm">
                Websites can request access to your camera. Malicious sites could potentially record you.
              </p>
              <div className="flex gap-4">
                {!cameraStream ? (
                  <button
                    onClick={requestCamera}
                    disabled={cameraLoading}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
                  >
                    Request Camera Access
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                  >
                    Stop Camera
                  </button>
                )}
              </div>
              {cameraError && (
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300 text-sm">
                  {cameraError}
                </div>
              )}
              {cameraStream && (
                <div className="mt-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-md rounded-lg border-4 border-purple-600"
                  />
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Your camera is currently active.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Browser Fingerprint */}
          {activeTab === 'fingerprint' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaFingerprint className="text-cyan-400" />
                Browser Fingerprinting
              </h3>
              {fingerprint && (
                <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-cyan-300">Your Browser Fingerprint</h4>
                    <div className="px-3 py-1 bg-cyan-600 rounded-full text-xs font-mono">
                      Hash: {generateFingerprintHash()}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-white">{fingerprint.platform}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">Screen:</span>
                      <span className="text-white">{fingerprint.screenResolution}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">Language:</span>
                      <span className="text-white">{fingerprint.language}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">Timezone:</span>
                      <span className="text-white">{fingerprint.timezone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">CPU Cores:</span>
                      <span className="text-white">{fingerprint.hardwareConcurrency}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400">Memory:</span>
                      <span className="text-white">{fingerprint.deviceMemory ? `${fingerprint.deviceMemory} GB` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-2">Why It's Dangerous</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Works even with cookies disabled</li>
                  <li>• Survives private/incognito browsing</li>
                  <li>• Difficult to detect or block</li>
                  <li>• Creates persistent identifiers</li>
                </ul>
              </div>
            </div>
          )}

          {/* Cookies */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaCookieBite className="text-orange-400" />
                Cookies & Tracking
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={setTestCookie}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                >
                  Set Test Cookie
                </button>
                <button
                  onClick={() => {
                    document.cookie.split(';').forEach(cookie => {
                      const name = cookie.split('=')[0].trim();
                      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
                    });
                    setCookies([]);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                >
                  Delete All Cookies
                </button>
              </div>
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-3">Current Cookies ({cookies.length})</h4>
                {cookies.length === 0 ? (
                  <p className="text-gray-400 text-sm">No cookies found</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {cookies.map((cookie, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800 rounded p-2">
                        <div className="flex-1">
                          <div className="font-mono text-sm text-blue-300">{cookie.name}</div>
                        </div>
                        <button
                          onClick={() => deleteCookie(cookie.name)}
                          className="ml-4 px-2 py-1 bg-red-600/50 hover:bg-red-600 rounded text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Network */}
          {activeTab === 'network' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaNetworkWired className="text-indigo-400" />
                Network Information
              </h3>
              {networkInfo && (
                <div className="bg-indigo-900/30 border border-indigo-700 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${networkInfo.online ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div>
                        <div className="text-sm text-gray-400">Status</div>
                        <div className="font-semibold">{networkInfo.online ? 'Online' : 'Offline'}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Connection Type</div>
                      <div className="font-semibold capitalize">{networkInfo.connectionType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Downlink Speed</div>
                      <div className="font-semibold">{networkInfo.downlink} Mbps</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Round Trip Time</div>
                      <div className="font-semibold">{networkInfo.rtt} ms</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Threats */}
          {activeTab === 'threats' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaUserSecret className="text-red-400" />
                Common Cyber Threats
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <FaFish className="text-red-400" />
                    Phishing
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.
                  </p>
                  <div className="text-xs text-gray-400">
                    <strong>Protection:</strong> Verify sender addresses, hover over links, enable 2FA
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <FaBug className="text-red-400" />
                    Malware
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Malicious software designed to damage or gain unauthorized access.
                  </p>
                  <div className="text-xs text-gray-400">
                    <strong>Protection:</strong> Keep software updated, use antivirus, scan attachments
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <FaEye className="text-red-400" />
                    Man-in-the-Middle
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Attackers intercept communication to steal or alter data.
                  </p>
                  <div className="text-xs text-gray-400">
                    <strong>Protection:</strong> Use HTTPS, avoid public WiFi for sensitive tasks, use VPN
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                    <FaCode className="text-red-400" />
                    Cross-Site Scripting (XSS)
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Attackers inject malicious scripts into trusted websites.
                  </p>
                  <div className="text-xs text-gray-400">
                    <strong>Protection:</strong> Content Security Policy, input/output encoding
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            <FaLock className="inline mr-2" />
            All data is collected locally in your browser and is not transmitted anywhere.
          </p>
        </div>
      </div>
    </Section>
  );
}