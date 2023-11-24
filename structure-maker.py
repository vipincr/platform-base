import os
import sys

def parse_structure(file_path, root_dir):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    path_stack = []

    for line in lines:
        if not line.strip():
            continue

        # Calculate indent level. Tabs are counted as 4 spaces.
        if '\t' in line:
            line = line.replace('\t', '    ')
        indent_level = len(line) - len(line.lstrip())
        current_level = indent_level // 4  # Assuming 4 spaces per indent level
        
        while len(path_stack) > current_level:
            path_stack.pop()

        item = line.strip()
        if item.endswith('/'):
            dir_name = item[:-1]
            dir_path = os.path.join(root_dir, *path_stack, dir_name) if path_stack else os.path.join(root_dir, dir_name)
            os.makedirs(dir_path, exist_ok=True)
            print(dir_path)
            path_stack.append(dir_name)
        else:
            file_path = os.path.join(root_dir, *path_stack, item)
            print(file_path)
            open(file_path, 'w').close()

            
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <structure_file_path> <root_directory>")
        sys.exit(1)

    structure_file_path = sys.argv[1]
    root_directory = sys.argv[2]

    parse_structure(structure_file_path, root_directory)

    print("Structure created successfully in:", root_directory)
