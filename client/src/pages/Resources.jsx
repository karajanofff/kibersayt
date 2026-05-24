import { useEffect, useState } from 'react';
import { Library, ExternalLink, FileText, Video } from 'lucide-react';
import { apiFetch } from '../api/client';
import { kaa, resourceTypeLabels } from '../i18n/kaa';

const typeIcons = {
  hújjet: FileText,
  hujjet: FileText,
  video: Video,
  standart: Library,
  'qısqa qollanba': FileText,
  cheatsheet: FileText,
  kurs: Library,
  maqala: FileText,
};

export default function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    apiFetch('/api/resources').then((res) => setResources(res.data));
  }, []);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Library className="h-8 w-8 text-cyber-400" />
        {kaa.resourcesTitle}
      </h1>
      <p className="mt-2 text-slate-400">{kaa.resourcesSubtitle}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {resources.map((r) => {
          const Icon = typeIcons[r.type] || FileText;
          const typeLabel = resourceTypeLabels[r.type] || r.type;
          return (
            <div key={r.id} className="card">
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 shrink-0 text-cyber-400" />
                <div className="flex-1">
                  <span className="text-xs uppercase text-slate-500">{typeLabel}</span>
                  <h2 className="font-semibold text-white">{r.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{r.description}</p>
                  {r.url && r.url !== '#' && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline"
                    >
                      {kaa.open} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
