def find_flow(matrix):
    def flowpath(r, c, visited_matrix): #dfs
        visited_matrix[r][c] = True
        directions = [(-1,0),(1,0),(0,-1),(0,1)]
        for direction in directions:
            newrow = r + direction[0]
            newcol = c + direction[1]
            if newrow >= 0 and newrow < rows and newcol>=0 and newcol < cols and not visited_matrix[newrow][newcol]:
                if int(matrix[newrow][newcol]) >= int(matrix[r][c]):
                    flowpath(newrow, newcol, visited_matrix)

    rows = len(matrix)
    cols = len(matrix[0])
    ne_visited = [[False for j in range(cols)] for i in range(rows)]
    sw_visited = [[False for j in range(cols)] for i in range(rows)]

    #east - right
    #west - left
    for i in range(rows):
        flowpath(i,0, ne_visited)
        flowpath(i,cols-1, sw_visited)
    #north  - top
    #south - bottom
    for j in range(cols):
        flowpath(0,j, ne_visited)
        flowpath(rows-1,j, sw_visited)

    resultcells = []
    for i in range(rows):
        for j in range(cols):
            if ne_visited[i][j] and sw_visited[i][j]:
                resultcells.append((i,j,))

    return len(resultcells)