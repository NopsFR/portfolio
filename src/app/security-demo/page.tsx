'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaCamera, 
  FaFingerprint, 
  FaCookieBite, 
  FaWifi,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaLock,
  FaUserSecret,
  FaEye,
  FaDatabase,
  FaNetworkWired,
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

export default function SecurityDemoPage() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [ipLoading, setIpLoading] = useState(true);
  const [ipError, setIpError] = useState<string | null>(null);
  
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoPermission, setGeoPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  
  const [fingerprint, setFingerprint] = useState<BrowserFingerprint | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [cookies, setCookies] = useState<{ name: string; value: string }[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSection, setActiveSection] = useState('overview');

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

  // Check permissions
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        if (navigator.permissions) {
          const geoResult = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setGeoPermission(geoResult.state);
          
          const cameraResult = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setCameraPermission(cameraResult.state);
        }
      } catch (err) {
        console.log('Permission check not supported');
      }
    };
    checkPermissions();
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
      setCameraPermission('granted');
    } catch (err) {
      setCameraError(err instanceof Error ? err.message : 'Camera access denied');
      setCameraPermission('denied');
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

  const sections = [
    { id: 'overview', label: 'Overview', icon: FaShieldAlt },
    { id: 'ip', label: 'IP & Location', icon: FaGlobe },
    { id: 'geolocation', label: 'Geolocation', icon: FaMapMarkerAlt },
    { id: 'camera', label: 'Camera Access', icon: FaCamera },
    { id: 'fingerprint', label: 'Browser Fingerprint', icon: FaFingerprint },
    { id: 'cookies', label: 'Cookies & Tracking', icon: FaCookieBite },
    { id: 'network', label: 'Network Info', icon: FaNetworkWired },
    { id: 'threats', label: 'Common Threats', icon: FaUserSecret },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-blue-800/50 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUserSecret className="text-3xl text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Cybersecurity Education Demo
                </h1>
                <p className="text-sm text-gray-400">Understanding What Data Websites Can Access</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/50 rounded-full border border-blue-700">
              <FaExclamationTriangle className="text-yellow-400" />
              <span className="text-sm text-yellow-400">Educational Purpose Only</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-700">
                <h2 className="font-semibold text-gray-300">Navigation</h2>
              </div>
              <ul className="py-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-600 text-white border-r-4 border-blue-400'
                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span className="text-sm font-medium">{section.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaShieldAlt className="text-blue-400" />
                    Welcome to the Cybersecurity Education Demo
                  </h2>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    This interactive demonstration shows what information websites and potential attackers 
                    can access about you through your browser. Understanding these capabilities is essential 
                    for protecting your privacy and security online.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                        <FaInfoCircle />
                        What You'll Learn
                      </h3>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• How your IP address reveals your location</li>
                        <li>• What browser fingerprinting can reveal</li>
                        <li>• How websites track you with cookies</li>
                        <li>• What permissions websites can request</li>
                        <li>• Common attack vectors and threats</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                      <h3 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                        <FaExclamationTriangle />
                        Important Warning
                      </h3>
                      <p className="text-sm text-gray-300">
                        The techniques demonstrated here are used by both legitimate websites 
                        and malicious actors. Understanding them helps you make informed 
                        decisions about your online privacy and security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {ipLoading ? '...' : ipInfo?.ip || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-400">Your Public IP</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {fingerprint ? '✓' : '...'}
                    </div>
                    <div className="text-sm text-gray-400">Fingerprint Collected</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {cookies.length}
                    </div>
                    <div className="text-sm text-gray-400">Active Cookies</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {networkInfo?.online ? 'Online' : 'Offline'}
                    </div>
                    <div className="text-sm text-gray-400">Connection Status</div>
                  </div>
                </div>
              </div>
            )}

            {/* IP & Location Section */}
            {activeSection === 'ip' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaGlobe className="text-blue-400" />
                    IP Address & Geolocation
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Your IP address is a unique identifier assigned to your device on the internet. 
                    Websites can use it to determine your approximate location, ISP, and other information.
                  </p>
                  
                  {ipLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    </div>
                  ) : ipError ? (
                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
                      Error: {ipError}
                    </div>
                  ) : ipInfo && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-300 mb-3">Your IP Information</h3>
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
                            <span className="text-gray-400">Postal Code:</span>
                            <span className="text-white">{ipInfo.postal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Timezone:</span>
                            <span className="text-white">{ipInfo.timezone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">ISP/Org:</span>
                            <span className="text-white text-xs">{ipInfo.org}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Coordinates:</span>
                            <span className="text-white font-mono text-xs">{ipInfo.loc}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                        <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                          <FaExclamationTriangle />
                          Security Implications
                        </h3>
                        <ul className="text-sm text-gray-300 space-y-2">
                          <li>• IP addresses can reveal your city/region</li>
                          <li>• ISPs can be used to identify your provider</li>
                          <li>• Location data can be combined with other info</li>
                          <li>• VPNs and proxies can mask your real IP</li>
                          <li>• Some sites use IP for geo-blocking</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h3 className="font-semibold text-lg mb-4">How Attackers Use IP Addresses</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Geolocation Tracking</h4>
                      <p className="text-sm text-gray-400">
                        Determining your approximate physical location to build a profile or for targeted attacks.
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">IP-Based Attacks</h4>
                      <p className="text-sm text-gray-400">
                        Direct attacks on your network, including port scanning and DDoS attempts.
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Session Hijacking</h4>
                      <p className="text-sm text-gray-400">
                        Using IP information to attempt session takeover or credential stuffing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Geolocation Section */}
            {activeSection === 'geolocation' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-green-400" />
                    Browser Geolocation API
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Modern browsers can access your precise location through GPS, Wi-Fi, and cell tower data. 
                    Websites must request permission, but users often grant it without understanding the implications.
                  </p>

                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-300 mb-2">Permission Status</h3>
                    <div className="flex items-center gap-2">
                      {geoPermission === 'granted' && (
                        <><FaCheckCircle className="text-green-400" /> <span className="text-green-400">Granted</span></>
                      )}
                      {geoPermission === 'denied' && (
                        <><FaExclamationTriangle className="text-red-400" /> <span className="text-red-400">Denied</span></>
                      )}
                      {geoPermission === 'prompt' && (
                        <><FaInfoCircle className="text-yellow-400" /> <span className="text-yellow-400">Not yet requested</span></>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={requestGeolocation}
                    disabled={geoLoading || geoPermission === 'denied'}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    {geoLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <FaMapMarkerAlt />
                    )}
                    {geoLocation ? 'Update Location' : 'Request Location Access'}
                  </button>

                  {geoError && (
                    <div className="mt-4 bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
                      {geoError}
                    </div>
                  )}

                  {geoLocation && (
                    <div className="mt-6 bg-green-900/30 border border-green-700 rounded-lg p-4">
                      <h3 className="font-semibold text-green-300 mb-3">Your Location Data</h3>
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
                        <div className="flex justify-between">
                          <span className="text-gray-400">Altitude:</span>
                          <span className="text-white">{geoLocation.altitude || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Heading:</span>
                          <span className="text-white">{geoLocation.heading || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Speed:</span>
                          <span className="text-white">{geoLocation.speed || 'N/A'} m/s</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a
                          href={`https://www.google.com/maps?q=${geoLocation.latitude},${geoLocation.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 underline text-sm"
                        >
                          View on Google Maps →
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                    <FaExclamationTriangle />
                    Security Implications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">How It Works</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• GPS data from your device</li>
                        <li>• Wi-Fi network triangulation</li>
                        <li>• Cell tower proximity</li>
                        <li>• IP-based location estimation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">Potential Misuse</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Stalking and harassment</li>
                        <li>• Location-based profiling</li>
                        <li>• Burglary planning (knowing when you're away)</li>
                        <li>• Targeted phishing based on location</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Camera Section */}
            {activeSection === 'camera' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaCamera className="text-purple-400" />
                    Camera Access
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Websites can request access to your camera for video calls, photo uploads, and other features. 
                    Malicious sites could potentially record you without your knowledge.
                  </p>

                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-blue-300 mb-2">Permission Status</h3>
                    <div className="flex items-center gap-2">
                      {cameraPermission === 'granted' && cameraStream && (
                        <><FaCheckCircle className="text-green-400" /> <span className="text-green-400">Active - Camera in use</span></>
                      )}
                      {cameraPermission === 'granted' && !cameraStream && (
                        <><FaCheckCircle className="text-green-400" /> <span className="text-green-400">Previously granted</span></>
                      )}
                      {cameraPermission === 'denied' && (
                        <><FaExclamationTriangle className="text-red-400" /> <span className="text-red-400">Denied</span></>
                      )}
                      {cameraPermission === 'prompt' && (
                        <><FaInfoCircle className="text-yellow-400" /> <span className="text-yellow-400">Not yet requested</span></>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    {!cameraStream ? (
                      <button
                        onClick={requestCamera}
                        disabled={cameraLoading}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        {cameraLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <FaCamera />
                        )}
                        Request Camera Access
                      </button>
                    ) : (
                      <button
                        onClick={stopCamera}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        <FaCamera />
                        Stop Camera
                      </button>
                    )}
                  </div>

                  {cameraError && (
                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
                      {cameraError}
                    </div>
                  )}

                  {cameraStream && (
                    <div className="mt-6">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full max-w-md rounded-lg border-4 border-purple-600"
                      />
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Your camera is currently active. Click "Stop Camera" to disable.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                  <h3 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
                    <FaExclamationTriangle />
                    Camera Security Risks
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-red-200 mb-2">Attack Methods</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Malicious browser extensions</li>
                        <li>• Compromised legitimate websites</li>
                        <li>• Social engineering to grant permission</li>
                        <li>• Malware with camera access</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-200 mb-2">Protection Tips</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Use camera covers when not in use</li>
                        <li>• Only grant camera access to trusted sites</li>
                        <li>• Regularly review browser permissions</li>
                        <li>• Keep browser and OS updated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Browser Fingerprint Section */}
            {activeSection === 'fingerprint' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaFingerprint className="text-cyan-400" />
                    Browser Fingerprinting
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Browser fingerprinting collects information about your browser and device to create a unique 
                    identifier. This can be used to track you across websites without cookies.
                  </p>

                  {fingerprint && (
                    <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-cyan-300">Your Browser Fingerprint</h3>
                        <div className="px-3 py-1 bg-cyan-600 rounded-full text-sm font-mono">
                          Hash: {generateFingerprintHash()}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">User Agent:</span>
                          <span className="text-white text-xs font-mono ml-2">{fingerprint.userAgent.substring(0, 50)}...</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Language:</span>
                          <span className="text-white">{fingerprint.language}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-white">{fingerprint.platform}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Screen Resolution:</span>
                          <span className="text-white">{fingerprint.screenResolution}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Color Depth:</span>
                          <span className="text-white">{fingerprint.colorDepth}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Timezone:</span>
                          <span className="text-white">{fingerprint.timezone}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Cookies Enabled:</span>
                          <span className="text-white">{fingerprint.cookieEnabled ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Do Not Track:</span>
                          <span className="text-white">{fingerprint.doNotTrack}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">CPU Cores:</span>
                          <span className="text-white">{fingerprint.hardwareConcurrency}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Device Memory:</span>
                          <span className="text-white">{fingerprint.deviceMemory ? `${fingerprint.deviceMemory} GB` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">Touch Points:</span>
                          <span className="text-white">{fingerprint.touchPoints}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">WebGL Vendor:</span>
                          <span className="text-white text-xs">{fingerprint.webGLVendor}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-700">
                          <span className="text-gray-400">WebGL Renderer:</span>
                          <span className="text-white text-xs">{fingerprint.webGLRenderer}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                    <FaExclamationTriangle />
                    Why Fingerprinting is Dangerous
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">Tracking Without Consent</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Works even with cookies disabled</li>
                        <li>• Survives private/incognito browsing</li>
                        <li>• Difficult to detect or block</li>
                        <li>• Creates persistent identifiers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">Uses by Attackers</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Cross-site tracking and profiling</li>
                        <li>• Identifying targets for attacks</li>
                        <li>• Bypassing rate limits</li>
                        <li>• Fraud detection evasion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-300 mb-4">Protection Methods</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">Browser Choice</h4>
                      <p className="text-sm text-gray-300">
                        Use privacy-focused browsers like Tor, Firefox with strict settings, or Brave.
                      </p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">Extensions</h4>
                      <p className="text-sm text-gray-300">
                        Install anti-fingerprinting extensions like CanvasBlocker or Privacy Badger.
                      </p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">VPN + Tor</h4>
                      <p className="text-sm text-gray-300">
                        Combine VPN with Tor browser for maximum anonymity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cookies Section */}
            {activeSection === 'cookies' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaCookieBite className="text-orange-400" />
                    Cookies & Tracking
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Cookies are small pieces of data stored by your browser. They're used for sessions, 
                    preferences, and tracking. Third-party cookies enable cross-site tracking.
                  </p>

                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={setTestCookie}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <FaCheckCircle />
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
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <FaExclamationTriangle />
                      Delete All Cookies
                    </button>
                  </div>

                  <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-300 mb-3">
                      Current Cookies ({cookies.length})
                    </h3>
                    {cookies.length === 0 ? (
                      <p className="text-gray-400 text-sm">No cookies found</p>
                    ) : (
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {cookies.map((cookie, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-800 rounded p-2">
                            <div className="flex-1">
                              <div className="font-mono text-sm text-blue-300">{cookie.name}</div>
                              <div className="font-mono text-xs text-gray-500 truncate">{cookie.value}</div>
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-6">
                    <h3 className="font-semibold text-green-300 mb-4">Legitimate Uses</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Session management (staying logged in)</li>
                      <li>• Shopping cart functionality</li>
                      <li>• Language and preference settings</li>
                      <li>• Analytics (with consent)</li>
                      <li>• Security features (CSRF tokens)</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
                    <h3 className="font-semibold text-red-300 mb-4">Malicious Uses</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li>• Cross-site tracking and profiling</li>
                      <li>• Session hijacking</li>
                      <li>• Cookie stuffing (affiliate fraud)</li>
                      <li>• Zombie cookies (respawning after deletion)</li>
                      <li>• Supercookies (harder to detect)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-300 mb-4">Cookie Security Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-2">For Users</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Regularly clear cookies</li>
                        <li>• Use private browsing mode</li>
                        <li>• Block third-party cookies</li>
                        <li>• Use cookie auto-delete extensions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-2">For Developers</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Use Secure and HttpOnly flags</li>
                        <li>• Implement SameSite attribute</li>
                        <li>• Set appropriate expiration</li>
                        <li>• Use CSRF tokens</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Network Section */}
            {activeSection === 'network' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaNetworkWired className="text-indigo-400" />
                    Network Information
                  </h2>
                  <p className="text-gray-300 mb-4">
                    The Network Information API reveals details about your internet connection. 
                    This can be used to optimize content delivery but also to fingerprint your device.
                  </p>

                  {networkInfo && (
                    <div className="bg-indigo-900/30 border border-indigo-700 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-300 mb-3">Your Network Status</h3>
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
                        <div>
                          <div className="text-sm text-gray-400">Data Saver Mode</div>
                          <div className="font-semibold">{networkInfo.saveData ? 'Enabled' : 'Disabled'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                    <FaExclamationTriangle />
                    Security Implications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">What Can Be Inferred</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Type of connection (mobile, wifi, etc.)</li>
                        <li>• Approximate bandwidth</li>
                        <li>• Network latency</li>
                        <li>• Whether you're on a metered connection</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">Attack Scenarios</h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        <li>• Timing attacks based on connection speed</li>
                        <li>• Identifying mobile vs desktop users</li>
                        <li>• Correlating with other fingerprint data</li>
                        <li>• Detecting VPN/proxy usage patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Threats Section */}
            {activeSection === 'threats' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <FaUserSecret className="text-red-400" />
                    Common Cyber Threats
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Understanding common attack methods helps you recognize and avoid them. 
                    Here are some of the most prevalent threats facing internet users today.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Phishing */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaFish className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">Phishing</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Verify sender email addresses</li>
                          <li>• Hover over links before clicking</li>
                          <li>• Enable 2FA on all accounts</li>
                          <li>• Use password managers</li>
                        </ul>
                      </div>
                    </div>

                    {/* Malware */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaBug className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">Malware</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Malicious software designed to damage, disrupt, or gain unauthorized access.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Keep software updated</li>
                          <li>• Use antivirus software</li>
                          <li>• Don't download from untrusted sources</li>
                          <li>• Scan email attachments</li>
                        </ul>
                      </div>
                    </div>

                    {/* Man-in-the-Middle */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaEye className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">Man-in-the-Middle</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Attackers intercept communication between two parties to steal or alter data.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Use HTTPS websites only</li>
                          <li>• Avoid public WiFi for sensitive tasks</li>
                          <li>• Use a VPN on public networks</li>
                          <li>• Verify SSL certificates</li>
                        </ul>
                      </div>
                    </div>

                    {/* SQL Injection */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaDatabase className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">SQL Injection</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Attackers inject malicious SQL code into web forms to access databases.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Use parameterized queries</li>
                          <li>• Input validation and sanitization</li>
                          <li>• Web Application Firewalls</li>
                          <li>• Regular security audits</li>
                        </ul>
                      </div>
                    </div>

                    {/* XSS */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaCode className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">Cross-Site Scripting (XSS)</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Attackers inject malicious scripts into trusted websites to steal user data.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Content Security Policy headers</li>
                          <li>• Input/output encoding</li>
                          <li>• HTTPOnly cookie flags</li>
                          <li>• XSS filtering</li>
                        </ul>
                      </div>
                    </div>

                    {/* Zero-Day */}
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <FaLock className="text-red-400 text-xl" />
                        <h3 className="font-semibold text-red-300">Zero-Day Exploits</h3>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        Attacks targeting previously unknown vulnerabilities before patches are available.
                      </p>
                      <div className="bg-red-900/30 rounded p-3">
                        <h4 className="text-xs font-semibold text-red-200 mb-2">Protection:</h4>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Keep software updated</li>
                          <li>• Use behavior-based antivirus</li>
                          <li>• Principle of least privilege</li>
                          <li>• Network segmentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-300 mb-4">General Security Best Practices</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">Authentication</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Use strong, unique passwords</li>
                        <li>• Enable 2FA everywhere</li>
                        <li>• Use a password manager</li>
                        <li>• Never reuse passwords</li>
                      </ul>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">Browsing</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Use privacy-focused browsers</li>
                        <li>• Install ad/tracker blockers</li>
                        <li>• Clear cookies regularly</li>
                        <li>• Use VPN for sensitive activities</li>
                      </ul>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-200 mb-2">System</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Keep OS and apps updated</li>
                        <li>• Use antivirus software</li>
                        <li>• Enable firewall</li>
                        <li>• Regular backups</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>This is an educational demonstration for cybersecurity awareness.</p>
          <p className="mt-1">All data shown is collected locally in your browser and is not transmitted anywhere.</p>
        </div>
      </footer>
    </div>
  );
}