import { PreviewUpdateContext } from "@/app/_context/PreviewUpdateContext";
import { db } from "@/utils";
import { project } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Link2, Tag } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";

const ProjectListEdit = ({projectList, refreshData}) => {
   const {updatePreview, setUpdatePreview} = useContext(PreviewUpdateContext);
    const [selectedOption, setSelectedOption] = useState();
    const timeoutRefs = useRef({});
    let timeoutId;
    const onInputChange = (event,fieldName, projectId) => {

      const key = `${projectId}_${fieldName}`;

      if (timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
      }
    
        clearTimeout(timeoutId);
        timeoutRefs.current[key] = setTimeout(async () => {
          const result = await db.update(project)
            .set({ [fieldName]: event.target.value })
            .where(eq(project.id, projectId));  
              
              if(result) {
                refreshData();
                toast.success('Saved!', {
                    position: 'top-right'
                })

                setUpdatePreview(updatePreview + 1);

              }else {
                toast.error('Error!', {
                    position: 'top-right'
                })
              }
        },2000);
    }

    return (
        <div className=" mt-10">
           {projectList.map((project, index) => (
             <div key={project.id} className="my-7 bg-gray-800 p-3 rounded-lg ">
                <div className="flex items-center gap-3">
                 <input type="text" placeholder="Project Name" defaultValue={project.name} onChange={(event) => onInputChange(event, 'name', project.id)} className="input input-bordered w-full my-2" />
                 </div>
                 <input type="text" placeholder="Tell me about your project" defaultValue={project.desc} onChange={(event) => onInputChange(event, 'desc', project.id)} className="input input-bordered w-full text-sm" />
                 <div>
                <div className="flex gap-3 mt-6" key={index}>
                    <Link2
                     onClick={() => setSelectedOption("link" + index)}
                     className={`h-12 w-12 p-3 rounded-md text-yellow-500 hover:bg-gray-600 ${selectedOption == 'link' && 'bg-gray-600'}`} />
                     <Tag 
                     onClick={() => setSelectedOption("category" + index)}
                     className={`h-12 w-12 p-3 rounded-md text-violet-500 hover:bg-gray-600 ${selectedOption == 'category' && 'bg-gray-600'}`} />
                </div>
                   {selectedOption == "link" + index ? 
                  ( <div className="mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <Link2 />
                        <input type="text" className="grow" placeholder="Link"  defaultValue={project?.url} 
                        onChange={(event) => onInputChange(event, 'url', project.id)} 
                        />
                    </label>
                    </div>) : 
                    selectedOption == "category" + index ?
                    (<div className="mt-2">
                    <label className="input input-bordered flex items-center gap-2">
                        <Tag />
                        <input type="text" className="grow" placeholder="Category"  defaultValue={project?.category} 
                        onChange={(event) => onInputChange(event, 'category', project.id)} 
                        />
                    </label>
                    </div>)
                    : null}
            </div>
            </div>
           ) )}
        </div>
    )
};

export default ProjectListEdit;