import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  name: string;
  children?: Section[];
}

interface SectionsNavProps {
  projectId: string;
  onSectionSelect: (sectionId: string) => void;
}

interface SectionItemProps {
  section: Section;
  onSelect: (id: string) => void;
  level: number;
  projectId: string;
}

const SectionItem: React.FC<SectionItemProps> = ({ section, onSelect, level, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubsections = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/sections/${section.id}`);
      const data = await response.json();
      setChildren(data.items);
    } catch (error) {
      console.error("Error fetching subsections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen && children.length === 0) {
      fetchSubsections();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-4 text-xs" style={{ marginLeft: `${level * 16}px` }}>
      <div
        className="cursor-pointer hover:bg-muted/50 p-2 rounded-md"
        onClick={() => {
          onSelect(section.id);
          setIsOpen(!isOpen);
        }}>
        {section.children && (isOpen ? "▼" : "▶")} {section.name}
      </div>
      {isOpen &&
        section.children &&
        section.children.map((child) => (
          <SectionItem key={child.id} section={child} onSelect={onSelect} level={level + 1} projectId={projectId} />
        ))}
    </div>
  );
};

const SectionsNav: React.FC<SectionsNavProps> = ({ projectId, onSectionSelect }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchSections();
  }, [projectId]);

  const fetchSections = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${projectId}/sections`);
      const { items: data } = await response.json();

      setSections(data);
    } catch (err) {
      setError("Error loading sections. Please try again.");
      console.error("Error fetching sections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className={cn("flex h-10 items-center justify-center p-4")}>
        <div className="w-full h-full font-medium">Source Control</div>
      </div>
      {/* <Separator />
      <div className="sections-nav space-y-2 p-4">
        {sections.map((section) => (
          <SectionItem key={section.id} section={section} onSelect={onSectionSelect} level={0} projectId={projectId} />
        ))}
      </div> */}
    </>
  );
};

export default SectionsNav;
